import { useNavigate } from "react-router-dom";

function PlantCard({ plant }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/plants/myplants/${plant.userPlantID}`);
  };

  return (
    <div className="plant-card" onClick={handleClick}>
      <img src={`/Plants/${plant.imagePointer}.jpg`} alt={plant.name || plant.plantName} />
      <h3>{plant.name}</h3>
    </div>
  );
}

export default PlantCard;