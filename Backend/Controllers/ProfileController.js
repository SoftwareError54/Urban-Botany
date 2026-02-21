import * as profileService from '../Services/ProfileService.js';

export async function getProfileByUserId(req, res) {
    try {
        const userId = req.params.userId;
        const profile = await profileService.getProfileByUserId(userId);
        if (!profile) {
            return res.status(404).json({ message: "Profile not found for this user" });
        }
        res.json(profile);
    } catch (error) {
        res.status(500).json({ message: "Error fetching profile", error: error.message });
    }
}

export default { getProfileByUserId };