import UserPlantRepository from '../Repositories/UserPlantRepository.js';

export async function getUserPlantsByUserId(userId) {
    if (!userId) {
        throw new Error("User ID is required");
    }
    const userPlants = await UserPlantRepository.getUserPlantsByUserId(userId);
    return userPlants;
}

export async function getUserPlantById(userPlantId){
    if(!userPlantId){
        throw new Error("USer Plant ID is required");
    }
    const userPlant = await UserPlantRepository.getUserPlantById(userPlantId);
    return userPlant;
}

export default { getUserPlantsByUserId, getUserPlantById };