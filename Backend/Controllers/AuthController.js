import { create } from 'node:domain';
import * as AuthService from '../Services/AuthService.js';

export async function signup(req,res){
    try{
        const user = await AuthService.signup(req.body);
        res.status(201).json(user);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

export async function authenticate(req,res){
    try{
        const {identifier, password} = req.body;
        const user = await AuthService.authenticate(identifier, password);
        res.status(200).json(user);
    }
    catch(error){
        res.status(401).json({error: error.message});
    }
}

export default {signup, authenticate};