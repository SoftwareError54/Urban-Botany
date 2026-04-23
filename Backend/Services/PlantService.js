import PlantRepository from "../Repositories/PlantRepository.js";

export async function getAllPlants() {
    return await PlantRepository.getAllPlants();
}

export async function getPlantById(plantId) {
    return await PlantRepository.getPlantById(plantId);
}

export async function getAllPlantDecorations(){
    return await PlantRepository.getAllPlantDecorations();
}

export async function getPlantDecorationById(decorationId){
    return await PlantRepository.getPlantDecorationById(decorationId);
}

export async function getDecorationByPlantId(plantId){
    return await PlantRepository.getDecorationByPlantId(plantId);
}

export async function addDecorationByPlantId(plantId, decorationId){
    return await PlantRepository.addDecorationByPlantId(plantId, decorationId);
}

export async function getMyPlants(userId){
    return await PlantRepository.getMyPlants(userId);
}

export async function getPlantsByRoomId(roomId){
    return await PlantRepository.getPlantsByRoomId(roomId);
}

export async function getPlantByLatinName(latinName){
    return await PlantRepository.getPlantByLatinName(latinName);
}

export async function getAllDecorationsByUserPlantId(userPlantId){
    return await PlantRepository.getAllDecorationsByUserPlantId(userPlantId);
}

export async function updatePlantDecorationToggle(userPlantId, decorationId){
    return await PlantRepository.updatePlantDecorationToggle(userPlantId, decorationId);
}

export async function resetPlantDecorationsByLayer(userPlantId, layer){
    return await PlantRepository.resetPlantDecorationsByLayer(userPlantId, layer);
}

export default {getAllPlants, getPlantById, getPlantsByRoomId, getPlantByLatinName};