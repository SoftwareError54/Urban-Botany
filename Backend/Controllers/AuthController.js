import * as authService from '../Services/AuthService.js';

export async function signup(req, res) {
    try{
        const {username, email, password} = req.body;
        const result = await authService.signup(username, email, password);
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
