import { useNavigate } from "react-router-dom";
import DecoratedPlant from './DecoratedPlant';

function PlantCard({ plant }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/plants/myplants/${plant.userPlantID}`);
  };

  return (
    <div className="plant-card" onClick={handleClick} style={{cursor: 'pointer'}}>
      <DecoratedPlant plant={plant} size={120} />
      <h3>{plant.name}</h3>
    </div>
  );
}

export default PlantCard;