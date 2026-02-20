import roomRepository from '../Repositories/RoomRepository.js';
import userPlantRepository from '../Repositories/UserPlantRepository.js';

export async function createRoom(userId, data) {
    const { roomName, decorationID = null, upperTemp = null, lowerTemp = null, lightLevel = null, humidity = null } = data;
    const id = await roomRepository.createRoom(userId, roomName, decorationID, upperTemp, lowerTemp, lightLevel, humidity);
    return { roomID: id };
}

export async function getRoomsForUser(userId) {
    const rooms = await roomRepository.getRoomsByUserId(userId);
    // attach plants for each room
    const withPlants = await Promise.all(rooms.map(async r => {
        const plants = await userPlantRepository.getPlantsByRoomId(r.roomID);
        return { ...r, plants };
    }));
    return withPlants;
}

export async function getRoomWithPlants(roomId) {
    const room = await roomRepository.getRoomById(roomId);
    if (!room) return null;
    const plants = await userPlantRepository.getPlantsByRoomId(roomId);
    return { ...room, plants };
}

export async function updateRoom(userId, roomId, updates) {
    return await roomRepository.updateRoomFields(roomId, userId, updates);
}

export async function deleteRoom(userId, roomId) {
    // optionally check if plants exist
    const plants = await userPlantRepository.getPlantsByRoomId(roomId);
    if (plants && plants.length > 0) {
        throw new Error('Room not empty; remove plants first');
    }
    return await roomRepository.deleteRoom(roomId, userId);
}

export default { createRoom, getRoomsForUser, getRoomWithPlants, updateRoom, deleteRoom };
