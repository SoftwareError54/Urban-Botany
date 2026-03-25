import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import UserRooms from '../RoomComponents/UserRooms';
import DecoratedPlant from './DecoratedPlant';
import { useNavigate } from 'react-router-dom';

import { getPlantById, getRooms, createUserPlant } from '../services/api';

function recommendRoom(plant, userRooms) {
    if (!plant || !userRooms || userRooms.length === 0) return null;

    // ensure numeric values exist
    const safe = (v, fallback = null) => (v === null || v === undefined ? fallback : Number(v));
    const plLower = safe(plant.lowerTemp);
    const plUpper = safe(plant.upperTemp);
    const plLowerLight = safe(plant.lowerLight);
    const plUpperLight = safe(plant.upperLight);

    if ([plLower, plUpper, plLowerLight, plUpperLight].some(v => v === null)) return null;

    const plantTempMid = (plLower + plUpper) / 2;
    const plantLightMid = (plLowerLight + plUpperLight) / 2;

    // Normalization ranges
    const minTemp = 0, maxTemp = 40;
    const minLight = 1, maxLight = 8;
    const normalize = (value, min, max) => (value - min) / (max - min);

    const scored = userRooms
        .map((room) => {
            const rLower = safe(room.lowerTemp);
            const rUpper = safe(room.upperTemp);
            const rLight = safe(room.lightLevel);
            if ([rLower, rUpper, rLight].some(v => v === null)) return null;

            const roomTempMid = (rLower + rUpper) / 2;
            const roomTempNorm = normalize(roomTempMid, minTemp, maxTemp);
            const plantTempNorm = normalize(plantTempMid, minTemp, maxTemp);

            const roomLightNorm = normalize(rLight, minLight, maxLight);
            const plantLightNorm = normalize(plantLightMid, minLight, maxLight);

            const tempDiff = Math.abs(roomTempNorm - plantTempNorm);
            const lightDiff = Math.abs(roomLightNorm - plantLightNorm);
            const score = 1 - (tempDiff + lightDiff) / 2;
            return { room, score };
        })
        .filter(Boolean)
        .sort((a, b) => b.score - a.score);

    return scored[0]?.room || null;
}


function AddPlant(){
    const { id: plantId } = useParams();
    const [plant, setPlant] = useState(null);
    const [rooms, setRooms] = useState([]);
    const [recommendedRoom, setRecomendedRoom] = useState(null);
    const [selectedRoomId, setSelectedRoomId] = useState('');
    const [plantName, setPlantName] = useState('');
    const navigate = useNavigate();

    useEffect(()=>{
        if(!plantId) return;
            getPlantById(plantId).then(setPlant).catch(()=>{});
            getRooms().then(setRooms).catch(()=>{});
    }, [plantId]);

    async function handleSubmit(e) {
        e.preventDefault();
        const roomToUse = selectedRoomId;
        if (!roomToUse) {
            alert('Please select a room or have a recommended room available');
            return;
        }
        try {
            const payload = {
                plantID: plant.plantID,
                plantName: plantName || plant.commonName || plant.latinName,
                roomID: roomToUse,
                recommendedRoomID: recommendedRoom?.roomID || null
            };
            const res = await createUserPlant(payload);
            console.log('Plant created', res);
            alert('Plant added successfully');
        } catch (err) {
            console.error(err);
            alert('Failed to add plant: ' + (err.message || err));
        }
        navigate('/rooms');
    }

    // compute recommendation after plant and rooms have loaded
    useEffect(() => {
        if (!plant || !rooms || rooms.length === 0) return;
        const recommended = recommendRoom(plant, rooms);
        setRecomendedRoom(recommended);
        console.log('Recommended room:', recommended);
    }, [plant, rooms]);

    return(
        <>
            <div>
                <h1>{plant?.latinName || 'Plant'}</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='form-section'>
                    <label htmlFor="plantName">Plant Name:</label>
                    <input
                        type = "text"
                        id = "plantName"
                        value={plantName}
                        onChange={(e) => setPlantName(e.target.value)}
                        placeholder = "Enter a name for your plant"
                        required
                        />
                </div>
                <div className="form-section">
                    <div style={{marginTop:12}} className="plant-grid">
                        <DecoratedPlant plant={plant} size={300} />
                    </div>
                </div>
                <div className="form-section">
                    <label htmlFor="roomSelect">Select Room:</label>
                    <select
                    id="roomSelect"
                    value={selectedRoomId}
                    onChange={(e)=>setSelectedRoomId(e.target.value)}
                    required
                    >
                    <option value="">--Choose a room--</option>
                    {rooms.map((room) => (
                        <option key={room.roomID} value={room.roomID}>
                            {(room.roomName || room.name) + (recommendedRoom && room.roomID === recommendedRoom.roomID ? ' (recommended)' : '')}
                        </option>
                    ))}
                    </select>
                </div>
                <div className="form-section">
                    <button type="submit">Add Plant</button>
                </div>
            </form>
        </>
    )
}

export default AddPlant;