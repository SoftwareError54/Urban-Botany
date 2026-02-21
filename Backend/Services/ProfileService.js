import profileRepository from '../Repositories/ProfileRepository.js';

export async function getProfileByUserId(userId){
    if(!userId){
        throw new Error("User ID is required");
    }
    return profileRepository.getProfileByUserId(userId);
}

export default { getProfileByUserId };