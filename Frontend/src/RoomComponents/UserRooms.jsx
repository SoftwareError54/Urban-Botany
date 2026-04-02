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
        <div className="rooms-header">
            <h1>Rooms</h1>
            <button className="shop-button">Shop</button>
        </div>
        
        <main>
        <div className="room-list">
            {!loading && rooms.length === 0 && (
                <div className="empty-rooms">
                    add your first room by pressing the plus button below
                </div>
            )}

            {rooms.map(room => (
            <RoomButton key={room.roomID} roomData={room} />
            ))}

            <button
            type="button"
            className="addRoom-button"
            onClick={() => navigate('/rooms/addroom')}
            aria-label="Add room"
            >
                <img src="/Icons/add.png" alt="Add room" className="action-icon add-icon" />
            </button>
        </div>
</main>
    </>

    )
}

export default UserRooms