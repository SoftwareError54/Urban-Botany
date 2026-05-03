import {getDecorationsByRoomId} from './api';
const MAX_LAYERS = 9;

const LAYER_DIRS = {
    1: 'backgrounds',
    2: 'weather',
    3: 'windows',
    4: 'blinds',
    5: 'walls',
    6: 'windowsills',
    8: 'radiators',
    9: 'curtains'
};

export async function buildRoomLayers(roomId) {
    const decorations = await getDecorationsByRoomId(roomId);

    const DEFAULT_LAYERS = {
        1: "/RoomDecorations/backgrounds/default_background.png",
        2: "/RoomDecorations/weather/default_weather.png",
        3: "/RoomDecorations/windows/default_window.png",
        4: "/RoomDecorations/blinds/default_blinds.png",
        5: "/RoomDecorations/walls/default_wall.png",
        6: "/RoomDecorations/windowsills/default_windowsill.png",
        8: "/RoomDecorations/radiators/default_rad.png",
        9: "/RoomDecorations/curtains/default_curtains.png"
    };

    const sorted = [...decorations].sort((a,b) => a.layer - b.layer);

    const layers = Array(MAX_LAYERS).fill(null);

    for(let i = 0; i < MAX_LAYERS; i++){
        const layerNumber = i + 1;

        if(layerNumber === 7){
            layers[i] = { type: 'plants', name: 'plants' };
        } else if(DEFAULT_LAYERS[layerNumber]){
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
            // Build full path using per-layer subdirectory
            const layerDir = LAYER_DIRS[decoration.layer];
            const src = pointer.includes('/') ? pointer : `/RoomDecorations/${layerDir ? layerDir + '/' : ''}${pointer}.png`;
            layers[index] = {
                src,
                name: decoration.decorationName
            };
        }
    });
    console.log(layers);
    return layers;
}