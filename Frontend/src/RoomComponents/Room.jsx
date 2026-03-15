import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRoom } from "../services/api";

function Room(){
    const { id } = useParams();
    const [room, setRoom] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
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
        fetchRoom();
        return () => { mounted = false; };
    }, [id]);

    if (loading) return <div>Loading room...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>{room.roomName}</h1>
        </div>
    );
}

export default Room;