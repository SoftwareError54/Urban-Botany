import { useLocation, useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getPlantByLatinName, getRooms } from '../services/api';
import DecoratedPlant from './DecoratedPlant';
import { useNavigate } from 'react-router-dom';

function recommendRoom(plant, userRooms) {
  if (!plant || !userRooms || userRooms.length === 0) return null;
  const safe = (v) => (v === null || v === undefined ? null : Number(v));
  const plLower = safe(plant.lowerTemp);
  const plUpper = safe(plant.upperTemp);
  const plLowerLight = safe(plant.lowerLight);
  const plUpperLight = safe(plant.upperLight);
  if ([plLower, plUpper, plLowerLight, plUpperLight].some(v => v === null)) return null;
  const plantTempMid = (plLower + plUpper) / 2;
  const plantLightMid = (plLowerLight + plUpperLight) / 2;
  const normalize = (value, min, max) => (value - min) / (max - min);
  const scored = userRooms
    .map((room) => {
      const rLower = safe(room.lowerTemp);
      const rUpper = safe(room.upperTemp);
      const rLight = safe(room.lightLevel);
      if ([rLower, rUpper, rLight].some(v => v === null)) return null;
      const roomTempMid = (rLower + rUpper) / 2;
      const tempDiff = Math.abs(normalize(roomTempMid, 0, 40) - normalize(plantTempMid, 0, 40));
      const lightDiff = Math.abs(normalize(rLight, 1, 8) - normalize(plantLightMid, 1, 8));
      return { room, score: 1 - (tempDiff + lightDiff) / 2 };
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score);
  return scored[0]?.room || null;
}

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
  const [rooms, setRooms] = useState([]);
  const [recommendedRoom, setRecommendedRoom] = useState(null);

  useEffect(()=>{
    if(!speciesName) return;
    let mounted = true;
    setLoading(true);
    Promise.all([
      getPlantByLatinName(speciesName),
      getRooms().catch(() => [])
    ])
      .then(([p, r]) => {
        if(!mounted) return;
        setPlant(p);
        setRooms(r || []);
      })
      .catch(e => { if(mounted) setError(e.message || 'Failed'); })
      .finally(()=> { if(mounted) setLoading(false); });
    return ()=>{ mounted = false; }
  }, [speciesName]);

  useEffect(() => {
    if (!plant || !rooms.length) return;
    setRecommendedRoom(recommendRoom(plant, rooms));
  }, [plant, rooms]);

  
  return (
    <div>
      <h1>Identified Species</h1>
      {score !== null && <p>Confidence: {Math.round(score * 100)}%</p>}

      {/* image beneath header */}
      {loading && <p>Loading plant image…</p>}
      {error && <p style={{color:'crimson'}}>Error loading plant details: {error}</p>}
      {plant?.imagePointer && (
        <div style={{marginTop:12}} className="plant-grid">
          <DecoratedPlant plant={plant} size={300} />
        </div>
      )}

      <div style={{marginTop:12}}>
        <div style={{fontSize:18, fontWeight:600}}>Species: <span style={{fontWeight:400}}>{displaySpecies}</span></div>
        <div style={{marginTop:6, fontSize:16}}><strong>Common Names:</strong> <span style={{fontWeight:400}}>{displayCommon}</span></div>
      </div>
      <PlantDetailDisplay plant={plant} recommendedRoom={recommendedRoom} />
    </div>
  );
}


function PlantDetailDisplay({ plant, recommendedRoom }){
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
        <div><strong>Recommended Location:</strong> {recommendedRoom?.roomName ?? '—'}</div>
      </div>
      <button onClick={() => addPlant(plant.plantID)}>Add to Room</button>
    </div>
  );
}
