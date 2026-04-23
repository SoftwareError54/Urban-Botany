import UserPlantService from '../Services/UserPlantService.js';
import { authenticateToken } from '../Middleware/authMiddleware.js';
import profileRepository from '../Repositories/ProfileRepository.js';

const TASK_POINTS = {
    water: 50,
    fertilize: 100,
    repot: 500,
};

export async function getUserPlantsByUserId(req, res) {
    try {
        const userId = req.params.userId;
        const userPlants = await UserPlantService.getUserPlantsByUserId(userId);
        if (!userPlants || userPlants.length === 0) {
            return res.status(404).json({ message: "No user plants found for this user" });
        }
        res.json(userPlants);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user plants", error: error.message });
    }
}

export async function getUserPlantById(req, res) {
    try{
        const userPlantId = req.params.userPlantId;
        const userPlant = await UserPlantService.getUserPlantById(userPlantId);
        if(!userPlant){
            return res.status(404).json({message: "User plant not found"});
        }
        res.json(userPlant);
    }
    catch(error){
        res.status(500).json({message: "Error fetching user plant", error: error.message});
    }
}

export async function addUserPlant(req, res) {
    try {
        const userId = req.userId || req.body.userId || null;
        if (!userId) return res.status(401).json({ message: 'User not authenticated' });

        const { plantID, plantName, roomID, recommendedRoomID } = req.body;
        if (!plantID || !roomID) return res.status(400).json({ message: 'plantID and roomID are required' });

        const createdId = await UserPlantService.createUserPlant(plantID, userId, roomID, plantName, recommendedRoomID);

        if (recommendedRoomID) console.log(`Recommended room ${recommendedRoomID} provided for userPlant ${createdId}`);

        res.status(201).json({ userPlantId: createdId });
    } catch (error) {
        console.error('addUserPlant error', error);
        res.status(500).json({ message: 'Error creating user plant', error: error.message });
    }
}

export async function updateUserPlant(req, res) {
    try {
        const userPlantId = req.params.userPlantId;
        const userId = req.userId;
        if (!userId) return res.status(401).json({ message: 'User not authenticated' });

        const { taskType, ...updates } = req.body || {};

        // Delegate to service
        const result = await UserPlantService.updateUserPlant(userPlantId, userId, updates);

        // Award points if a task type was provided
        let pointsAwarded = 0;
        if (taskType && TASK_POINTS[taskType]) {
            pointsAwarded = TASK_POINTS[taskType];
            await profileRepository.addPoints(userId, pointsAwarded);
        }

        res.json({ message: 'User plant updated', result, pointsAwarded });
    } catch (error) {
        console.error('updateUserPlant error', error);
        res.status(500).json({ message: 'Error updating user plant', error: error.message });
    }
}

export default { getUserPlantsByUserId, getUserPlantById, addUserPlant, updateUserPlant };