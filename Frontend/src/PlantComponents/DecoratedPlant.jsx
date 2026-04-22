import { useEffect, useState } from 'react';
import { getDecorationsByPlantId } from '../services/api';
import '../css/plants.css';

export default function DecoratedPlant({ plant, plantId, imagePointer, size = 112 }){
  // support either a full plant object or id + imagePointer
  const id = plant?.userPlantID ?? plantId ?? plant?.plantID;
  const imgPointer = plant?.imagePointer ?? imagePointer;
  const [decoration, setDecoration] = useState(null);

  useEffect(() => {
    if (!id) return;
    let mounted = true;
    getDecorationsByPlantId(id)
      .then(data => { if(mounted && Array.isArray(data) && data.length) setDecoration(data[0]); })
      .catch(() => { /* ignore decoration errors, fallback will be used */ });
    return () => { mounted = false; };
  }, [id]);

  const initialPlantSrc = imgPointer ? `/Plants/${imgPointer}.png` : '/Plants/default_plants.png';
  const [plantSrc, setPlantSrc] = useState(initialPlantSrc);

  // update plantSrc when the incoming imagePointer/plant changes
  useEffect(() => {
    setPlantSrc(initialPlantSrc);
  }, [initialPlantSrc]);
  // Build pot source: allow stored pointers with or without extension and
  // fall back to default pot if loading fails.
  let potSrc = '/PlantDecorations/default_pot.png';
  if (decoration && decoration.imagePointer) {
    const pointer = decoration.imagePointer;
    // if pointer already has an extension, use as-is; otherwise assume .png
    potSrc = pointer.match(/\.(png|jpg|jpeg|webp)$/i)
      ? `/PlantDecorations/${pointer}`
      : `/PlantDecorations/${pointer}.png`;
  }

  // Render pot first, then plant so plant overlays pot (same technique as room scene)
  const layers = [
    { src: potSrc, name: 'pot' },
    { src: plantSrc, name: 'plant' }
  ];

  return (
    <div className="plant-scene" style={{ width: size, height: size }}>
      {layers.map((layer, idx) => (
        <img
          key={idx}
          src={layer.src}
          alt={layer.name}
          className="plant-layer"
          onError={e => {
            // If plant image fails, try common alternate extension
            if (layer.name === 'plant') {
              if (plantSrc.endsWith('.png')) setPlantSrc(`/Plants/${imgPointer}.jpg`);
            }
            // If pot image fails, fall back to default pot
            if (layer.name === 'pot') {
              if (!e.target.src.includes('default_pot')) e.target.src = '/PlantDecorations/default_pot.png';
            }
          }}
        />
      ))}
    </div>
  );
}
