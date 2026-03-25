import RoomButton from '../RoomComponents/RoomCard';
import { useState, useEffect } from 'react';
import { getRooms } from '../services/api';
import {useNavigate} from "react-router-dom";

function UserRooms(){
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [rooms, setRooms] = useState([]);
    const navigate=useNavigate();

    

    useEffect(() => {
        async function loadRooms() {
            try{
            const myRooms = await getRooms();
                console.log('getRooms response:', myRooms);
                const normalized = Array.isArray(myRooms)
                    ? myRooms
                    : (myRooms.results ?? myRooms.rooms ?? []);
                console.log('normalized rooms:', normalized);
                setRooms(normalized);
            }
            catch(err){
                console.log(err);
                setError("Failed to load rooms. Please try again later.");
            }
            finally{
                setLoading(false);
            }
        }
        loadRooms();
    }, [])

    return(
    <>
        <div>
            <h1>Rooms</h1>
            <button>Shop</button>
        </div>
        
        <main>
        <div className="room-list">
            {rooms.map(room => (
            <RoomButton key={room.roomID} roomData={room} />
            ))}

            <button
            type="button"
            className="addRoom-button"
            onClick={() => navigate('/rooms/addroom')}
            >
            +
            </button>
        </div>
</main>
    </>

    )
}

export default UserRooms