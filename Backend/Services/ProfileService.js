import bcrypt from 'bcrypt';
import profileRepository from '../Repositories/ProfileRepository.js';

const saltRounds = 10;

export async function updateField(userId, field, value) {
    return await profileRepository.updateField(userId, field, value);
}

export async function updateFields(userId, updates) {
    return await profileRepository.updateFields(userId, updates);
}

export async function updatePassword(userId, currentPassword, newPassword) {
    const user = await profileRepository.getUserByID(userId);
    if (!user) {
        throw new Error('User not found');
    }
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
        const err = new Error('Current password is incorrect');
        err.code = 'INVALID_CURRENT_PASSWORD';
        throw err;
    }
    const hashed = await bcrypt.hash(newPassword, saltRounds);
    return await profileRepository.updatePassword(userId, hashed);
}

export default { updateField, updateFields, updatePassword };
