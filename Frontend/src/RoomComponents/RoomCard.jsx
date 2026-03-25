import { useNavigate } from "react-router-dom";
import {useEffect, useState} from "react";
import {buildRoomLayers} from "../services/sceneBuilder";


function RoomButton({ roomData, roomName, roomID }){
  const navigate = useNavigate();
  const name = roomData?.roomName ?? roomName;
  const id = roomData?.roomID ?? roomID;

  const [layers, setLayers] = useState([]);

  useEffect(() => {
    async function loadScene(){
      if (!id) return;

      const sceneLayers = await buildRoomLayers(id);
      setLayers(sceneLayers);
    }
    loadScene();
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
            <img
              key={index}
              src={layer.src}
              alt={layer.name}
              className="room-layer"
              />
          ) : null
        )}
      </div>
      <span>{name}</span>
    </button>
  );
}

export default RoomButton;