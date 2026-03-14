import { useNavigate } from "react-router-dom";

function RoomButton({ roomData, roomName, roomID }){
  const navigate = useNavigate();
  const name = roomData?.roomName ?? roomName;
  const id = roomData?.roomID ?? roomID;

  function handleClick(){
    if(!id){
      console.warn('No room id provided for navigation');
      return;
    }
    navigate(`/Rooms/${id}`);
  }

  return(
    <button type="button" className="nav-button" onClick={handleClick}>{name}</button>
  );
}

export default RoomButton;