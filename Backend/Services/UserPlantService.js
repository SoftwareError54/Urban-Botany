import userPlantRepository from '../Repositories/UserPlantRepository.js';
import roomRepository from '../Repositories/RoomRepository.js';

export async function addPlantToRoom(userId, roomId, data) {
    // ensure room belongs to user
    const room = await roomRepository.getRoomById(roomId);
    if (!room || room.userID !== userId) throw new Error('Room not found or access denied');
    const { plantID, plantName } = data;
    const id = await userPlantRepository.createUserPlant(plantID, userId, roomId, plantName || null);
    return { userPlantID: id };
}

export async function getPlantsForRoom(roomId) {
    return await userPlantRepository.getPlantsByRoomId(roomId);
}

export async function updateUserPlant(userId, userPlantID, updates) {
    return await userPlantRepository.updateUserPlant(userPlantID, userId, updates);
}

export async function removeUserPlant(userId, userPlantID) {
    return await userPlantRepository.deleteUserPlant(userPlantID, userId);
}

export default { addPlantToRoom, getPlantsForRoom, updateUserPlant, removeUserPlant };
