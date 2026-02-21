import PlantRepository from "../Repositories/PlantRepository.js";

export async function getAllPlants() {
    return await PlantRepository.getAllPlants();
}

export async function getPlantById(plantId) {
    return await PlantRepository.getPlantById(plantId);
}

export default {getAllPlants, getPlantById};