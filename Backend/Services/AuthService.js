import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userRepository from '../Repositories/AuthRepository.js';

const saltRounds = 10;
const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';


export async function signup({userName, password, email, DoB, FName, SName, phoneNum, points, addressLine1, addressLine2, city, region, postalCode, countryCode}) {
    const existingUser = await userRepository.findUserByDetails(email, userName, phoneNum);
    if(existingUser && existingUser.email === email) {
        throw new Error('User already exists with email: ${email}');
    }

    if(existingUser && existingUser.phoneNum === phoneNum){
        throw new Error('User already exists with phone number: ${phoneNum}');
    }

    if(existingUser && existingUser.userName === userName){
        throw new Error('User already exists with username: ${userName}');
    }
    
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = await userRepository.createUser(userName, hashedPassword, email, DoB, FName, SName, phoneNum, points, addressLine1, addressLine2, city, region, postalCode, countryCode);
    const token = jwt.sign({userId: user.id}, JWT_SECRET);
    return {user, token};
}

export async function authenticate(email, password) {
    const user = await userRepository.findUserByEmail(email);
    if(!user) {
        throw new Error('Invalid credentials');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid) {
        throw new Error('Invalid credentials');
    }
    const token = jwt.sign({userId: user.id}, JWT_SECRET);
    console.log("User ID: ", user.id);
    console.log(token);
    return {user, token};
    
}

export default {signup, authenticate};