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

export default {getAllPlants, getPlantById};