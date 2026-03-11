import {useEffect, useState } from "react";
import { getRoomsbyUserId } from "../services/roomService";
import {Link} from "react-router-dom";
import { get } from "node:http";

export default function Rooms(){
    return(<>
    <h1>Your Rooms</h1>
    </>)
    // const [rooms, setRooms] = useState([]);
    // // const userId = localStorage.getItem("userId");
    // const userId = 1; // Placeholder for testing

    // useEffect(() => {
    //     async function fetchRooms() {
    //         const data = await getRoomsbyUserId(userId);
    //         setRooms(data);
    //     }
    //     fetchRooms();
    // },[]);

    // return(
    //     <div>
    //         <h1>Your Rooms</h1>
    //         {rooms.map(room=> (
    //             <div key={room.id}>
    //                 <p>{room.name}</p>
    //                 <Link to={`/rooms/${room.id}`}>View Room</Link>

    //             </div>

    //         ))}
    //         </div>
    // );
}