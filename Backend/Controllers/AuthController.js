import * as authService from '../Services/AuthService.js';

export async function signup(req, res) {
    try{
        const {userName, password, email, DoB, FName, SName, phoneNum, points, addressLine1, addressLine2, city, region, postalCode, countryCode} = req.body;
        const result = await authService.signup({userName, password, email, DoB, FName, SName, phoneNum, points, addressLine1, addressLine2, city, region, postalCode, countryCode});
        res.status(201).json(result);
    }catch(error){
        res.status(400).json({ message: error.message });
    }
}

export async function login(req, res) {
    try{
        const {email, password} = req.body;
        const result = await authService.login(email, password);
        res.status(200).json(result);
    }catch(error){
        res.status(400).json({ message: error.message });
    }
}

export default {signup, login};