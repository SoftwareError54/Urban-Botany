const API_URL = 'http://localhost:3000';

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
