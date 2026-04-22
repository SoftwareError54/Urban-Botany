import { useNavigate } from "react-router-dom";
import DecoratedPlant from './DecoratedPlant';
import '../css/plants.css';

function PlantCard({ plant, size = 96 }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/plants/myplants/${plant.userPlantID}`);
  };

  return (
    <div className="plant-card" onClick={handleClick} style={{cursor: 'pointer'}}>
      <DecoratedPlant plant={plant} size={size} />
      <h3>{plant.name}</h3>
    </div>
  );
}

export default PlantCard;