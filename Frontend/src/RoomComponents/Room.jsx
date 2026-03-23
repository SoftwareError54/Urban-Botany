import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRoom, getDecorationsByRoomId, getPlantsByRoomId } from "../services/api";

import PlantCard from "../PlantComponents/PlantCard";

function Room(){
    const { id } = useParams();
    const [room, setRoom] = useState(null);
    const [roomPlants, setPlants] = useState([]);
    const [roomDecorations, setRoomDecorations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [state, setState] = useState('static');

useEffect(() => {
        if (!id) return;

        let mounted = true;

        async function fetchData() {
            try {
                const [roomData, decorationData, plantData] = await Promise.all([
                    getRoom(id),
                    getDecorationsByRoomId(id),
                    getPlantsByRoomId(id)
                ]);

                if (mounted) {
                    setRoom(roomData);
                    setRoomDecorations(decorationData);
                    setPlants(plantData);
                    console.log(decorationData);
                }
            } catch (err) {
                console.error(err);
                if (mounted) setError("Failed to load room");
            } finally {
                if (mounted) setLoading(false);
            }
        }

        fetchData();

        return () => { mounted = false; };
    }, [id]);

    if (loading) return <div>Loading room...</div>;
    if (error) return <div>Error: {error}</div>;

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
            <div>
                <h1>Decorations</h1>
                {roomDecorations.length === 0 ?  (
                    <p>No Decorations</p>
                ) : (
                    roomDecorations.map ((dec) => (
                        <div key={dec.roomDecorationID}>
                            <img
                                src={`../../public/RoomDecorations/${dec.imagePointer}`}
                                alt = "decoration"
                                style = {{width: "100px"}}
                            />
                        </div>
                    ))
                )}
            </div>
            <div>
                <h1>Plants</h1>
                <div className="plant-grid">
                    {roomPlants.map(p => (
                        <PlantCard key={p.userPlantID} plant={p} />
                    ))}
                </div>
            </div>

        </>
    );
}

export default Room;