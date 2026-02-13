import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userRepository from '../Repositories/AuthRepository.js';

const saltRounds = 10;
const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';


export async function signup({username, password, email, DoB, FName, SName, PhoneNumber, points, addressLine1, addressLine2, city, region, postalCode, countryCode}) {
    const existingUser = await userRepository.findUserByEmail(email);
    if(existingUser) {
        throw new Error('User already exists');
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = await userRepository.createUser(username, hashedPassword, email, DoB, FName, SName, PhoneNumber, points, addressLine1, addressLine2, city, region, postalCode, countryCode);
    const token = jwt.sign({userId: user.id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});
    return {user, token};
}

export async function login(email, password) {
    const user = await userRepository.findUserByEmail(email);
    if(!user) {
        throw new Error('Invalid credentials');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid) {
        throw new Error('Invalid credentials');
    }
    const token = jwt.sign({userId: user.id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});
    return {user, token};
}

export default {signup, login};