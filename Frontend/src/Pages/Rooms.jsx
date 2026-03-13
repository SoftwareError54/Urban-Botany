import { useState, useEffect } from 'react';


import RoomButton from '../RoomComponents/RoomCard';
import NavBar from '../GlobalComponents/NavBar';
import { getRooms } from '../services/api';

function Rooms(){
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [rooms, setRooms] = useState([]);

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

    // const rooms = [
    //     {roomID: 1, roomName: "Living Room"},
    //     {roomID: 2, roomName: "Kitchen"},
    //     {roomID: 3, roomName: "Bedroom"},
    // ];

    return(
    <>
        <div>
            <h1>Rooms</h1>
            <button>Shop</button>
        </div>
        
        <main>
        <ul>
            {rooms.map(room => (
                <li key={room.roomID}>
                    <RoomButton roomName={room.roomName} />
                </li>
            ))}
            <li>
                <button>+</button>
            </li>
        </ul>
        </main>
    </>
    )
}

export default Rooms;