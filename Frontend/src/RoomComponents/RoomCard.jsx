import { useNavigate } from "react-router-dom";
import {useEffect, useState} from "react";
import '../css/rooms.css';
import {buildRoomLayers} from "../services/sceneBuilder";
import { getPlantsByRoomId } from "../services/api";
import PlantCard from "../PlantComponents/PlantCard";


function RoomButton({ roomData, roomName, roomID }){
  const navigate = useNavigate();
  const name = roomData?.roomName ?? roomName;
  const id = roomData?.roomID ?? roomID;

  const [layers, setLayers] = useState([]);
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    async function loadScene(){
      if (!id) return;

      const sceneLayers = await buildRoomLayers(id);
      setLayers(sceneLayers);
    }
    loadScene();
  }, [id]);

  useEffect(() => {
    let mounted = true;
    if (!id) return;
    getPlantsByRoomId(id)
      .then(data => { if (mounted && Array.isArray(data)) setPlants(data); })
      .catch(() => { if (mounted) setPlants([]); });
    return () => { mounted = false; };
  }, [id]);

  function handleClick(){
    if(!id){
      console.warn('No room id provided for navigation');
      return;
    }
    navigate(`/rooms/room/${id}`);
  }

  return(
    <button type="button" className="room-button" onClick={handleClick}>
      <div className="room-scene">
        {layers.map((layer, index) =>
          layer ? (
            layer.type === 'plants' ? (
              <div key={index} className="room-plants-layer">
                {plants.map(p => (
                  <div className="room-plant-wrapper" key={p.userPlantID}>
                    <PlantCard plant={p} size={80} />
                  </div>
                ))}
              </div>
            ) : (
              <img
                key={index}
                src={layer.src}
                alt={layer.name}
                className="room-layer"
              />
            )
          ) : null
        )}
      </div>
      <span>{name}</span>
    </button>
  );
}

export default RoomButton;