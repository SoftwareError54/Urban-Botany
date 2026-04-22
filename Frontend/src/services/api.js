const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const getDecorationsByPlantId = async(plantId) => {
    const response = await fetch (`${BASE_URL}/myplants/${plantId}/decoration`, {
        headers: buildHeaders()
    });
    if (!response.ok) throw new Error('Failed to fetch decorations');
    const data = await response.json();
    console.log(data);
    return data;
};

function buildHeaders(json = false) {
    const headers = {};
    const token = localStorage.getItem('token');
    if (token) headers['Authorization'] = `Bearer ${token}`;
    if (json) headers['Content-Type'] = 'application/json';
    return headers;
}

export const getDecorationsByRoomId = async (roomId) => {
    const response = await fetch(`${BASE_URL}/rooms/${roomId}/decorations`, {
        headers: buildHeaders()
    });
    if (!response.ok) throw new Error('Failed to fetch decorations');
    const data = await response.json();
    console.log(data);
    return data;
};

export const getAllRoomDecorations = async () => {
    const response = await fetch(`${BASE_URL}/rooms/0/decorations/alldecorations`, {
        headers: buildHeaders()
    });
    if (!response.ok) throw new Error('Failed to fetch all room decorations');
    const data = await response.json();
    return data;
};

export const getAllDecorationsByRoomId = async (roomId) => {
    const response = await fetch(`${BASE_URL}/rooms/${roomId}/decorations/all`, {
        headers: buildHeaders()
    });
    if (!response.ok) throw new Error('Failed to fetch room decorations');
    const data = await response.json();
    return data;
};

export const updateRoomDecoration = async (roomId, decorationId) => {
    const response = await fetch(`${BASE_URL}/rooms/${roomId}/decorations/update/${decorationId}`, {
        method: 'PUT',
        headers: buildHeaders(true)
    });
    if (!response.ok) throw new Error('Failed to update decoration');
    const data = await response.json();
    return data;
};

export const resetRoomDecoration = async (roomId, layer) => {
    const response = await fetch(`${BASE_URL}/rooms/${roomId}/decorations/reset/${layer}`, {
        method: 'PUT',
        headers: buildHeaders(true)
    });
    if (!response.ok) throw new Error('Failed to reset decoration');
    const data = await response.json();
    return data;
};

export const getRooms = async () => {
    const userId = localStorage.getItem('userId');
    const response = await fetch(`${BASE_URL}/rooms/${userId}`, {
        headers: buildHeaders()
    });
    if (!response.ok) throw new Error('Failed to fetch rooms');
    const data = await response.json();
    console.log(data);
    return data;
};

export const getRoom = async (roomId) => {
    const response = await fetch(`${BASE_URL}/rooms/room/${roomId}`, {
        headers: buildHeaders()
    });
    if (!response.ok) throw new Error('Failed to fetch room');
    const data = await response.json();
    console.log(data);
    return data;
};

export const login = async (email, password) => {
    const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    if (!response.ok) {
        const err = await response.json().catch(()=>({message: 'Login failed'}));
        throw new Error(err.message || 'Failed to log in');
    }
    const data = await response.json();
    console.log('login response', data);
    console.log('login token', data.token);
    return data;
}



export const signup = async (user) => {
    // Normalize frontend field names to backend-expected fields
    const body = {
        userName: user.username || user.userName,
        password: user.password,
        email: user.email,
        DoB: user.DoB,
        FName: user.firstName || user.FirstName,
        SName: user.lastName || user.LastName,
        phoneNum: user.phoneNumber || user.phoneNum,
        points: 0,
        addressLine1: user.addressLine1,
        addressLine2: user.addressLine2,
        city: user.city,
        region: user.region,
        postalCode: user.postalCode,
        countryCode: user.country || user.countryCode
    };
    console.log('signup payload', body);
    const response = await fetch(`${BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });
    if (!response.ok) {
        const err = await response.json().catch(()=>({message: 'Signup failed'}));
        throw new Error(err.message || 'Failed to sign up');
    }
    const data = await response.json();
    console.log('signup response', data);
    return data;
}

export const getPlantsByRoomId = async (roomId) => {
    const response = await fetch(`${BASE_URL}/plants/room/${roomId}`, {
        headers: buildHeaders()
    });
    if (!response.ok) throw new Error('Failed to fetch plants');
    const data = await response.json();
    console.log(data);
    return data;
};

export const getPlantById = async (plantId) => {
    const response = await fetch(`${BASE_URL}/plants/${plantId}`, {
        headers: buildHeaders()
    });
    if (!response.ok) throw new Error('Failed to fetch plant');
    const data = await response.json();
    console.log('getPlantById', data);
    return data;
};

export const getUserPlantById = async (userPlantId) => {
    const response = await fetch(`${BASE_URL}/userplants/userplant/${userPlantId}`, {
        headers: buildHeaders()
    });
    if (!response.ok) throw new Error('Failed to fetch user plant');
    const data = await response.json();
    console.log('getUserPlantById', data);
    return data;
};

export const getPlantByLatinName = async (latinName) => {
    console.log(latinName);
    const response = await fetch(`${BASE_URL}/plants/bylatin?name=${encodeURIComponent(latinName)}`, {
        headers: buildHeaders()
    });
    if (!response.ok) throw new Error('Failed to fetch plant by latin name');
    const data = await response.json();
    console.log('getPlantByLatinName', data);
    return data;
};

export const createUserPlant = async ({ plantID, plantName, roomID, recommendedRoomID }) => {
    const body = { plantID, plantName, roomID, recommendedRoomID };
    const response = await fetch(`${BASE_URL}/userplants`, {
        method: 'POST',
        headers: buildHeaders(true),
        body: JSON.stringify(body)
    });
    if (!response.ok) {
        const err = await response.json().catch(()=>({message: 'Failed to create user plant'}));
        throw new Error(err.message || 'Failed to create user plant');
    }
    const data = await response.json();
    console.log('createUserPlant', data);
    return data;
};

export const getPlantsByUserId = async () => {
    const userId = localStorage.getItem('userId');
    const response = await fetch(`${BASE_URL}/userplants/${userId}`, {
        headers: buildHeaders()
    });
    if (!response.ok) throw new Error('Failed to fetch user plants');
    const data = await response.json();
    console.log('getPlantsByUserId', data);
    return data;
};

export const getUserProfile = async (userId) => {
    const response = await fetch(`${BASE_URL}/profile/${userId}`, {
        headers: buildHeaders()
    });
    if (!response.ok) throw new Error('Failed to fetch user profile');
    return await response.json();
};