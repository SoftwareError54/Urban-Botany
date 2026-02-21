import roomRepository from "../Repositories/RoomRepository.js";

export async function getRoomsByUserId(userId){
    if(!userId){
        throw new Error("User ID is required");
    }
    const rooms = await roomRepository.getRoomsByUserId(userId);
    return rooms;
}

export async function getRoomById(roomId){
    if(!roomId){
        throw new Error("Room ID is required");
    }
    const room = await roomRepository.getRoomById(roomId);
    return room;
}

export default {getRoomsByUserId, getRoomById};