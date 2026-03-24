import { useLocation, useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getPlantByLatinName } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function IdentifiedPlant(){
  const { state } = useLocation();
  const [searchParams] = useSearchParams();
  const nameParam = searchParams.get('name') || null;
  const score = state?.score ?? null;
  const raw = state?.raw ?? null;
  const navigate = useNavigate();

  // derive species and common names
  let speciesName = null;
  let commonNames = [];

  if (raw && Array.isArray(raw.results) && raw.results.length > 0) {
    const first = raw.results[0];
    const species = first.species || {};
    speciesName = species.scientificNameWithoutAuthor || species.scientificName || nameParam || null;
    if (Array.isArray(species.commonNames) && species.commonNames.length) {
      commonNames = species.commonNames;
    } else if (species.common_name) {
      commonNames = Array.isArray(species.common_name) ? species.common_name : [species.common_name];
    }
  } else if (nameParam) {
    speciesName = nameParam;
  }

  const displaySpecies = speciesName || 'Unknown';
  const displayCommon = commonNames.length ? commonNames.join(', ') : '—';

  // fetch plant details (including imagePointer) once speciesName is known
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(()=>{
    if(!speciesName) return;
    let mounted = true;
    setLoading(true);
    getPlantByLatinName(speciesName)
      .then(p => { if(mounted) setPlant(p); })
      .catch(e => { if(mounted) setError(e.message || 'Failed'); })
      .finally(()=> { if(mounted) setLoading(false); });
    return ()=>{ mounted = false; }
  }, [speciesName]);

  
  return (
    <div>
      <h1>Identified Species</h1>
      {score !== null && <p>Confidence: {Math.round(score * 100)}%</p>}

      {/* image beneath header */}
      {loading && <p>Loading plant image…</p>}
      {error && <p style={{color:'crimson'}}>Error loading plant details: {error}</p>}
      {plant?.imagePointer && (
        <div style={{marginTop:12}}>
          <img src={`../../public/Plants/${plant.imagePointer}.jpg`} alt={plant.commonName || plant.latinName} style={{maxWidth:300}} />
        </div>
      )}

      <div style={{marginTop:12}}>
        <div style={{fontSize:18, fontWeight:600}}>Species: <span style={{fontWeight:400}}>{displaySpecies}</span></div>
        <div style={{marginTop:6, fontSize:16}}><strong>Common Names:</strong> <span style={{fontWeight:400}}>{displayCommon}</span></div>
      </div>
      <PlantDetailDisplay plant={plant} />
    </div>
  );
}


function PlantDetailDisplay({ plant }){
  const navigate = useNavigate();

  function addPlant(plantId){
    console.log(plantId);
    navigate(`/plants/addplant/${plantId}`);
  }

  if(!plant) return null;


  return (
    <div style={{marginTop:16}}>
      <div style={{marginTop:12}}>
        <div><strong>Light Level:</strong> {`${plant.lowerLight ?? '—'} - ${plant.upperLight ?? '—'}`}</div>
        <div><strong>Watering Frequency:</strong> {plant.wateringFreq ?? '—'}</div>
        <div><strong>Care Difficulty:</strong> {plant.careDifficulty ?? '—'}</div>
        <div><strong>Temperature Range:</strong> {plant.lowerTemp ?? '-'}°C - {plant.upperTemp ?? '-' }°C</div>
        <div><strong>Recommended Location:</strong> {plant.recommendedLoc ?? '—'}</div>
      </div>
      <button onClick={() => addPlant(plant.plantID)}>Add to Room</button>
    </div>
  );
}
