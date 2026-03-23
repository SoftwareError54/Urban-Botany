import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserPlantById, getPlantById } from "../services/api";

function PlantPage(){
    const { id } = useParams();
    const [userPlant, setUserPlant] = useState(null);
    const [plant, setPlant] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if(!id) return;
        let mounted = true;
        async function fetchData(){
            try{
                const up = await getUserPlantById(id);
                if(!mounted) return;
                setUserPlant(up);
                // fetch base plant data if we have plantID
                if(up && up.plantID){
                    const p = await getPlantById(up.plantID);
                    if(!mounted) return;
                    setPlant(p);
                }
            } catch(err){
                console.error(err);
                if(mounted) setError(err.message || 'Failed to load plant');
            } finally{
                if(mounted) setLoading(false);
            }
        }
        fetchData();
        return () => { mounted = false; };
    }, [id]);

    if(loading) return <div>Loading plant...</div>;
    if(error) return <div>Error: {error}</div>;

    const title = userPlant?.plantName || plant?.commonName || 'Plant';
    const common = plant?.commonName || userPlant?.plantName;
    const latin = plant?.latinName || '-';

    return (
        <div className="plant-page">
            <h1>{title}</h1>
            {plant?.imagePointer ? (
                <img src={`/Plants/${plant.imagePointer}.jpg`} alt={common} style={{maxWidth: '300px'}} />
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
                <p><strong>Recommended Room:</strong> {plant?.recommendedLoc ?? '-'}</p>
            </div>
        </div>
    )
}

export default PlantPage;