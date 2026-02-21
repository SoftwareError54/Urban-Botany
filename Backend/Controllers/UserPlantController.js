import UserPlantService from '../Services/UserPlantService.js';

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

export default { getUserPlantsByUserId, getUserPlantById };