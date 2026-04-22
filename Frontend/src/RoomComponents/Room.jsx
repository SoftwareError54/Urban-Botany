import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import '../css/roomDetail.css';
import { getRoom, getDecorationsByRoomId, getPlantsByRoomId, getAllDecorationsByRoomId, updateRoomDecoration, resetRoomDecoration } from "../services/api";
import { buildRoomLayers } from "../services/sceneBuilder";
import PlantCard from "../PlantComponents/PlantCard";

const LAYER_CATEGORIES = [
    { label: 'Background', layer: 1 },
    { label: 'Weather', layer: 2 },
    { label: 'Window', layer: 3 },
    { label: 'Blinds', layer: 4 },
    { label: 'Wall', layer: 5 },
    { label: 'Windowsill', layer: 6 },
    { label: 'Radiator', layer: 8 },
    { label: 'Curtains', layer: 9 },
];

function Room(){
    const { id } = useParams();
    const navigate = useNavigate();
    const [room, setRoom] = useState(null);
    const [roomPlants, setPlants] = useState([]);
    const [roomDecorations, setRoomDecorations] = useState([]);
    const [allDecorations, setAllDecorations] = useState([]);
    const [sceneLayers, setSceneLayers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // Track current dropdown selections per layer locally
    const [selections, setSelections] = useState({});

    async function loadAll() {
        try {
            const [roomData, decorationData, plantData, allDecs, layers] = await Promise.all([
                getRoom(id),
                getDecorationsByRoomId(id),
                getPlantsByRoomId(id),
                getAllDecorationsByRoomId(id),
                buildRoomLayers(id)
            ]);
            setRoom(roomData);
            setRoomDecorations(decorationData);
            setPlants(plantData);
            setAllDecorations(allDecs);
            setSceneLayers(layers);

            // Initialise selections from fetched toggled decorations
            const sel = {};
            decorationData.forEach(d => {
                sel[d.layer] = String(d.roomDecorationID);
            });
            setSelections(sel);
        } catch (err) {
            console.error(err);
            setError("Failed to load room");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!id) return;
        loadAll();
    }, [id]);

    // Handle dropdown change
    async function handleDecorationChange(layerNum, decorationId) {
        // Update local selection immediately so the dropdown reflects the change
        setSelections(prev => ({ ...prev, [layerNum]: decorationId }));

        try {
            if (decorationId) {
                // Toggle the selected decoration on
                await updateRoomDecoration(id, decorationId);
            } else {
                // "Default" selected — un-toggle all decorations on this layer
                await resetRoomDecoration(id, layerNum);
            }
            // Rebuild scene with new toggled decorations
            const [decorationData, layers] = await Promise.all([
                getDecorationsByRoomId(id),
                buildRoomLayers(id)
            ]);
            setRoomDecorations(decorationData);
            setSceneLayers(layers);
        } catch (err) {
            console.error('Failed to update decoration:', err);
            // Revert selection on failure
            const match = roomDecorations.find(d => d.layer === layerNum);
            setSelections(prev => ({
                ...prev,
                [layerNum]: match ? String(match.roomDecorationID) : ''
            }));
        }
    }

    if (loading) return <div>Loading room...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="room-detail">
            <h1 className="room-detail-name">{room.roomName}</h1>

            {/* Scene preview */}
            <div className="room-detail-scene">
                <div className="room-scene room-scene--large">
                    {sceneLayers.map((layer, index) =>
                        layer ? (
                            <img
                                key={index}
                                src={layer.src}
                                alt={layer.name}
                                className="room-layer"
                            />
                        ) : null
                    )}
                    {/* Overlay plants on the scene */}
                    {roomPlants.length > 0 && (
                        <div className="room-plants-layer">
                            {roomPlants.map(p => (
                                <div className="room-plant-wrapper" key={p.userPlantID}>
                                    <PlantCard plant={p} size={80} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Plant slots + add button */}
            <div className="room-detail-plants">
                {roomPlants.map(p => (
                    <div className="room-detail-plant-slot" key={p.userPlantID}>
                        <PlantCard plant={p} size={64} />
                    </div>
                ))}
                <button
                    className="room-detail-add-plant"
                    onClick={() => navigate('/scan')}
                    aria-label="Add plant"
                >
                    <img src="/Icons/add.png" alt="Add plant" className="action-icon add-icon" />
                </button>
            </div>

            {/* Decoration dropdowns */}
            <div className="room-detail-decorations">
                {LAYER_CATEGORIES.map(cat => {
                    const options = allDecorations.filter(d => d.layer === cat.layer);
                    const selected = selections[cat.layer] || '';
                    return (
                        <div className="decoration-dropdown-row" key={cat.layer}>
                            <label className="decoration-label">{cat.label}</label>
                            <select
                                className="decoration-select"
                                value={selected}
                                onChange={e => handleDecorationChange(cat.layer, e.target.value)}
                            >
                                <option value="">Default</option>
                                {options.map(dec => (
                                    <option key={dec.roomDecorationID} value={String(dec.roomDecorationID)}>
                                        {dec.decorationName}
                                    </option>
                                ))}
                            </select>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Room;