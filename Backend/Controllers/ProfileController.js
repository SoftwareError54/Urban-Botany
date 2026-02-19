import * as profileService from '../Services/ProfileService.js';

export async function updateField(req, res) {
    try {
        const userId = req.user && req.user.userId;
        const { field, value } = req.body;
        if (!userId) return res.status(401).json({ message: 'Unauthorized' });
        if (!field) return res.status(400).json({ message: 'Field is required' });
        const result = await profileService.updateField(userId, field, value);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export async function updateFields(req, res) {
    try {
        const userId = req.user && req.user.userId;
        const updates = req.body || {};
        if (!userId) return res.status(401).json({ message: 'Unauthorized' });
        const result = await profileService.updateFields(userId, updates);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export async function changePassword(req, res) {
    try {
        const userId = req.user && req.user.userId;
        const { currentPassword, newPassword } = req.body;
        if (!userId) return res.status(401).json({ message: 'Unauthorized' });
        if (!currentPassword || !newPassword) return res.status(400).json({ message: 'Both current and new passwords are required' });
        const result = await profileService.updatePassword(userId, currentPassword, newPassword);
        res.status(200).json(result);
    } catch (error) {
        if (error.code === 'INVALID_CURRENT_PASSWORD') return res.status(403).json({ message: error.message });
        res.status(400).json({ message: error.message });
    }
}

export default { updateField, updateFields, changePassword };
