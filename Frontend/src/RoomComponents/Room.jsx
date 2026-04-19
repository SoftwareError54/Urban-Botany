import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRoom, getDecorationsByRoomId, getPlantsByRoomId, getAllRoomDecorations, updateRoomDecoration } from "../services/api";
import { buildRoomLayers } from "../services/sceneBuilder";
import PlantCard from "../PlantComponents/PlantCard";

const LAYER_CATEGORIES = [
    { label: 'Background', layer: 1 },
    { label: 'Wall', layer: 5 },
    { label: 'Weather', layer: 2 },
    { label: 'Window Frame', layer: 3 },
    { label: 'Foreground', layer: 9 },
];

function Room(){
    const { id } = useParams();
    const navigate = useNavigate();
    const [room, setRoom] = useState(null);
    const [roomPlants, setPlants] = useState([]);
    const [roomDecorations, setRoomDecorations] = useState([]);
    const [allDecorations, setAllDecorations] = useState([]);
    const [sceneLayers, setSceneLayers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    async function loadAll() {
        try {
            const [roomData, decorationData, plantData, allDecs, layers] = await Promise.all([
                getRoom(id),
                getDecorationsByRoomId(id),
                getPlantsByRoomId(id),
                getAllRoomDecorations(),
                buildRoomLayers(id)
            ]);
            setRoom(roomData);
            setRoomDecorations(decorationData);
            setPlants(plantData);
            setAllDecorations(allDecs);
            setSceneLayers(layers);
        } catch (err) {
            console.error(err);
            setError("Failed to load room");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!id) return;
        loadAll();
    }, [id]);

    // Get the currently selected decoration ID for a given layer
    function getSelectedForLayer(layerNum) {
        const match = roomDecorations.find(d => d.layer === layerNum);
        return match ? match.roomDecorationID : '';
    }

    // Handle dropdown change
    async function handleDecorationChange(layerNum, decorationId) {
        if (!decorationId) return;
        try {
            await updateRoomDecoration(id, decorationId);
            // Reload everything to reflect the change
            const [decorationData, layers] = await Promise.all([
                getDecorationsByRoomId(id),
                buildRoomLayers(id)
            ]);
            setRoomDecorations(decorationData);
            setSceneLayers(layers);
        } catch (err) {
            console.error('Failed to update decoration:', err);
        }
    }

    if (loading) return <div>Loading room...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="room-detail">
            <h1 className="room-detail-name">{room.roomName}</h1>

            {/* Scene preview */}
            <div className="room-detail-scene">
                <div className="room-scene room-scene--large">
                    {sceneLayers.map((layer, index) =>
                        layer ? (
                            <img
                                key={index}
                                src={layer.src}
                                alt={layer.name}
                                className="room-layer"
                            />
                        ) : null
                    )}
                    {/* Overlay plants on the scene */}
                    {roomPlants.length > 0 && (
                        <div className="room-plants-layer">
                            {roomPlants.map(p => (
                                <div className="room-plant-wrapper" key={p.userPlantID}>
                                    <PlantCard plant={p} size={80} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Plant slots + add button */}
            <div className="room-detail-plants">
                {roomPlants.map(p => (
                    <div className="room-detail-plant-slot" key={p.userPlantID}>
                        <PlantCard plant={p} size={64} />
                    </div>
                ))}
                <button
                    className="room-detail-add-plant"
                    onClick={() => navigate('/scan')}
                    aria-label="Add plant"
                >
                    <img src="/Icons/add.png" alt="Add plant" className="action-icon add-icon" />
                </button>
            </div>

            {/* Decoration dropdowns */}
            <div className="room-detail-decorations">
                {LAYER_CATEGORIES.map(cat => {
                    const options = allDecorations.filter(d => d.layer === cat.layer);
                    const selected = getSelectedForLayer(cat.layer);
                    return (
                        <div className="decoration-dropdown-row" key={cat.layer}>
                            <label className="decoration-label">{cat.label}</label>
                            <select
                                className="decoration-select"
                                value={selected}
                                onChange={e => handleDecorationChange(cat.layer, e.target.value)}
                            >
                                <option value="">Default</option>
                                {options.map(dec => (
                                    <option key={dec.roomDecorationID} value={dec.roomDecorationID}>
                                        {dec.decorationName}
                                    </option>
                                ))}
                            </select>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Room;