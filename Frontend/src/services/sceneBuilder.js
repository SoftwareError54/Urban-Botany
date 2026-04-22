import {getDecorationsByRoomId} from './api';
const MAX_LAYERS = 9;

export async function buildRoomLayers(roomId) {
    const decorations = await getDecorationsByRoomId(roomId);

    const DEFAULT_LAYERS = {
        1: "../../public/RoomDecorations/default_background.png",
        2: "../../public/RoomDecorations/default_weather.png",
        3: "../../public/RoomDecorations/default_window.png",
        4: "../../public/RoomDecorations/default_blinds.png",
        5: "../../public/RoomDecorations/default_wall.png",
        6: "../../public/RoomDecorations/default_windowsill.png",
        7: "../../public/Plants/default_plants.png",
        8: "../../public/RoomDecorations/default_rad.png",
        9: "../../public/RoomDecorations/default_curtains.png"
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
            const pointer = decoration.imagePointer;
            // Build full path if imagePointer is just a name (no slash or extension)
            const src = pointer.includes('/') ? pointer : `/RoomDecorations/${pointer}.png`;
            layers[index] = {
                src,
                name: decoration.decorationName
            };
        }
    });
    console.log(layers);
    return layers;
}