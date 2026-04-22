const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export async function getRoomsbyUserId(userId) {
    const response = await fetch(`${API_URL}/rooms/${userId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch rooms');
    }
    return response.json();
}

export async function getRoomById(roomId) {
    const response = await fetch(`${API_URL}/rooms/room/${roomId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch room');
    }
    return response.json();
}

export async function addRoom(room){
    const body={
        userID: room.userID,
         roomName: room.roomName,
         upperTemp: room.upperTemp,
         lowerTemp: room.lowerTemp,
         lightLevel: room.lightLevel,
         humidity: room.humidity
    };
    const response = await fetch(`${API_URL}/rooms/addroom`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
    });
    if(!response.ok){
        const err = await response.json().catch(()=>({message: 'Failed to add room'}));
        throw new Error(err.message || "Failed to add room");
    }
    const data = await response.json();
    console.log("Add room response", data);
    return data;
}