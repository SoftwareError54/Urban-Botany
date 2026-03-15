import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRoom, getDecorationsByRoomId } from "../services/api";

function Room(){
    const { id } = useParams();

    const [room, setRoom] = useState(null);
    const [roomPlants, setPlants] = useState(null);
    const [roomDecorations, setRoomDecorations] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [state, setState] = useState('static');

    useEffect(() => {
        console.log(id)
        if (!id) return;
        let mounted = true;
        async function fetchRoom() {
            try {
                const data = await getRoom(id);
                if (mounted) setRoom(data);
            } catch (err) {
                console.error(err);
                if (mounted) setError('Failed to load room');
            } finally {
                if (mounted) setLoading(false);
            }
        }
        async function fetchRoomDecorations(){
            try{
                const data = await getDecorationsByRoomId(id);
                if (mounted) setRoomDecorations(data);
            } catch (err){
                console.log(err);
                if (mounted) setError("Failed to Load Decorations");
            }
        }

        fetchRoom();
        fetchRoomDecorations();
        return () => { mounted = false; };
    }, [id]);

    if (loading) return <div>Loading room...</div>;
    if (error) return <div>Error: {error}</div>;
    console.log(room);

    return (
        <>
            <div>
                <h1>{room.roomName}</h1>
            </div>
            <div>
                <h2>Environmental Data</h2>
                <h3>Upper Temp: {room.upperTemp}°C</h3>
                <h3>Lower Temp: {room.lowerTemp}°C</h3>
                <h3>Humidity: {room.humidity}%</h3>
                <h3>light Level: {room.lightLevel}</h3>
            </div>
        </>
    );
}

export default Room;