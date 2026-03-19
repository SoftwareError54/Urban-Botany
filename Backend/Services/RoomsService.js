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

export async function getAllRoomDecorations(){
    return await roomRepository.getAllRoomDecorations();
}

export async function getRoomDecorationById(decorationId){
    if(!decorationId){
        throw new Error("Decoration Id is required");
    }
    const decoration = await roomRepository.getRoomDecorationById(decorationId);
    return decoration;
}

export async function getDecorationsByRoomId(roomId){
    if(!roomId){
        throw new Error("RoomId is required");
    }
    const decoration = await roomRepository.getDecorationsByRoomId(roomId);
    return decoration;
}

export async function addDecoration(decorationId, roomId){
    if(!decorationId){
        throw new Error("DecorationId is required");
    }
    if(!roomId){
        throw new Error("RoomId is required");
    }
    const decoration = await roomRepository.addDecoration(decorationId, roomId);
    return decoration;
}

export default {getRoomsByUserId, getRoomById, getAllRoomDecorations, getDecorationsByRoomId, getRoomById, getRoomDecorationById, addDecoration};