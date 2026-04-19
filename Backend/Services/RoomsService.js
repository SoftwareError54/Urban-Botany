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

export async function addRoom({userID, roomName, upperTemp, lowerTemp, lightLevel, humidity}){
    if(!userID){
        throw new Error("User ID is required");
    }
    if(!roomName){
        throw new Error("Room name is required");
    }
    const newRoom = await roomRepository.addRoom(userID, roomName, upperTemp, lowerTemp, lightLevel, humidity);
    return newRoom;

}

export async function updateDecorationByLayer(roomId, decorationId){
    if(!roomId) throw new Error("RoomId is required");
    if(!decorationId) throw new Error("DecorationId is required");
    return await roomRepository.updateDecorationByLayer(roomId, decorationId);
}

export default {getRoomsByUserId, getRoomById, getAllRoomDecorations, getDecorationsByRoomId, getRoomById, getRoomDecorationById, addDecoration, addRoom};