import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserPlantById, getPlantById, getRoom, getAllDecorationsByPlantId, updatePlantDecoration, resetPlantDecoration } from "../services/api";
import DecoratedPlant from './DecoratedPlant';
import '../css/plants.css';

const PLANT_LAYER_LABELS = { 1: 'Pot', 2: 'Accessory', 3: 'Sticker' };

function PlantPage(){
    const { id } = useParams();
    const [userPlant, setUserPlant] = useState(null);
    const [plant, setPlant] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [room, setRoom] = useState(null);
    const [allDecorations, setAllDecorations] = useState([]);
    const [selections, setSelections] = useState({});
    // key to force DecoratedPlant to re-fetch after a toggle
    const [decorationVersion, setDecorationVersion] = useState(0);

    async function loadDecorations() {
        try {
            const decs = await getAllDecorationsByPlantId(id);
            if (Array.isArray(decs)) {
                setAllDecorations(decs);
                const sel = {};
                decs.forEach(d => { if (d.toggled) sel[d.layer] = String(d.plantDecorationID); });
                setSelections(sel);
            }
        } catch {
            // decorations are optional — ignore errors
        }
    }

    useEffect(() => {
        if(!id) return;
        let mounted = true;
        async function fetchData(){
            try{
                const up = await getUserPlantById(id);
                if(!mounted) return;
                setUserPlant(up);
                if(up && up.plantID){
                    const p = await getPlantById(up.plantID);
                    if(!mounted) return;
                    setPlant(p);
                }
                if(up && up.roomID){
                    const r = await getRoom(up.roomID);
                    if(!mounted) return;
                    setRoom(r);
                }
            } catch(err){
                console.error(err);
                if(mounted) setError(err.message || 'Failed to load plant');
            } finally{
                if(mounted) setLoading(false);
            }
        }
        fetchData();
        loadDecorations();
        return () => { mounted = false; };
    }, [id]);

    async function handleDecorationChange(layer, decorationId) {
        setSelections(prev => ({ ...prev, [layer]: decorationId }));
        try {
            if (decorationId) {
                await updatePlantDecoration(id, decorationId);
            } else {
                await resetPlantDecoration(id, layer);
            }
            setDecorationVersion(v => v + 1);
            await loadDecorations();
        } catch (err) {
            console.error('Failed to update plant decoration:', err);
            const prev = allDecorations.find(d => d.layer === layer && d.toggled);
            setSelections(s => ({ ...s, [layer]: prev ? String(prev.plantDecorationID) : '' }));
        }
    }

    if(loading) return <div>Loading plant...</div>;
    if(error) return <div>Error: {error}</div>;

    const title = userPlant?.plantName || plant?.commonName || 'Plant';
    const common = plant?.commonName || userPlant?.plantName;
    const latin = plant?.latinName || '-';

    // Gather layers that have at least one owned decoration
    const layers = [...new Set(allDecorations.map(d => d.layer))].sort((a, b) => a - b);

    return (
        <div className="plant-page">
            <h1>{title}</h1>
            {plant ? (
                <div className="plant-grid">
                  <DecoratedPlant key={decorationVersion} plant={plant} plantId={id} size={300} />
                </div>
            ) : (
                <div style={{width:300,height:200,background:'#eee',display:'flex',alignItems:'center',justifyContent:'center'}}>No image</div>
            )}

            <div>
                <p><strong>Common Name:</strong> {common}</p>
                <p><strong>Latin Name:</strong> {latin}</p>
            </div>

            <div>
                <p><strong>Light Level:</strong> {`${plant.lowerLight ?? '—'} - ${plant.upperLight ?? '—'}`}</p>
                <p><strong>Watering Frequency:</strong> {plant?.wateringFreq ?? '-'}</p>
                <p><strong>Care Difficulty:</strong> {plant?.careDifficulty ?? '-'}</p>
                <p><strong>Temperature Range:</strong> {plant ? `${plant.lowerTemp}°C - ${plant.upperTemp}°C` : '-'}</p>
                <p><strong>Recommended Room:</strong> {room?.roomName ?? '-'}</p>
            </div>

            {layers.length > 0 && (
                <div className="plant-decorations">
                    {layers.map(layer => {
                        const options = allDecorations.filter(d => d.layer === layer);
                        const selected = selections[layer] || '';
                        const label = PLANT_LAYER_LABELS[layer] ?? `Layer ${layer}`;
                        return (
                            <div className="decoration-dropdown-row" key={layer}>
                                <label className="decoration-label">{label}</label>
                                <select
                                    className="decoration-select"
                                    value={selected}
                                    onChange={e => handleDecorationChange(layer, e.target.value)}
                                >
                                    <option value="">Default</option>
                                    {options.map(dec => (
                                        <option key={dec.plantDecorationID} value={String(dec.plantDecorationID)}>
                                            {dec.decorationName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    )
}

export default PlantPage;