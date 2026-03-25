import {getDecorationsByPlantId} from './api';
const MAX_LAYERS = 2;

export async function buildPlantLayers(plantId) {
    const decorations = await getDecorationsByPlantId(plantId);

    const DEFAULT_LAYERS = {
        1: "../../public/Plants/monstera.png",
        2: "../../public/PlantDecorations/default_pot.png"
    }
    

    const sorted = [...decorations].sort((a,b) => a.layer - b.layer);

    const layers = Array(MAX_LAYERS).fill(null);

    for(let i = 0; i < MAX_LAYERS; i++){
        const layerNumber = i + 1;

        if(DEFAULT_LAYERS[layerNumber]){
            layers[i] = {
                src: DEFAULT_LAYERS[layerNumber],
                name: "default"
            };
        }
    }

    sorted.forEach((decoration) => {
        const index = decoration.layer-1;
        if (index >= 0 && index < MAX_LAYERS) {
            layers[index] = {
                src: decoration.imagePointer,
                name: decoration.decorationName
            };
        }
    });
    console.log(layers);
    return layers;
}