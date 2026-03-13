const BASE_URL = "http://localhost:3000";
const USERID = 2; // Placeholder for user ID, replace with actual user ID from authentication

export const getRooms = async () => {
        const response = await fetch(`${BASE_URL}/rooms/${USERID}`);
        if (!response.ok) throw new Error('Failed to fetch rooms');
        const data = await response.json();
        console.log(data);
        return data;
};