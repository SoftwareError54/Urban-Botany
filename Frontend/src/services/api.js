const BASE_URL = "http://localhost:3000";
const USERID = localStorage.getItem('userId');

export const getRooms = async () => {
        const response = await fetch(`${BASE_URL}/rooms/${USERID}`);
        if (!response.ok) throw new Error('Failed to fetch rooms');
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