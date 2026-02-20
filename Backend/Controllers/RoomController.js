import * as roomService from '../Services/RoomService.js';
import * as plantService from '../Services/UserPlantService.js';

export async function createRoom(req, res) {
    try {
        const userId = req.user && req.user.userId;
        if (!userId) return res.status(401).json({ message: 'Unauthorized' });
        const payload = req.body || {};
        const result = await roomService.createRoom(userId, payload);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

export async function getRooms(req, res) {
    try {
        const userId = req.user && req.user.userId;
        if (!userId) return res.status(401).json({ message: 'Unauthorized' });
        const result = await roomService.getRoomsForUser(userId);
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

export async function getRoom(req, res) {
    try {
        const roomId = Number(req.params.id);
        const result = await roomService.getRoomWithPlants(roomId);
        if (!result) return res.status(404).json({ message: 'Room not found' });
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

export async function updateRoom(req, res) {
    try {
        const userId = req.user && req.user.userId;
        const roomId = Number(req.params.id);
        if (!userId) return res.status(401).json({ message: 'Unauthorized' });
        const updates = req.body || {};
        const result = await roomService.updateRoom(userId, roomId, updates);
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

export async function deleteRoom(req, res) {
    try {
        const userId = req.user && req.user.userId;
        const roomId = Number(req.params.id);
        if (!userId) return res.status(401).json({ message: 'Unauthorized' });
        const result = await roomService.deleteRoom(userId, roomId);
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

// Plant-related handlers
export async function getPlants(req, res) {
    try {
        const roomId = Number(req.params.id);
        const plants = await plantService.getPlantsForRoom(roomId);
        res.status(200).json(plants);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

export async function addPlant(req, res) {
    try {
        const userId = req.user && req.user.userId;
        const roomId = Number(req.params.id);
        if (!userId) return res.status(401).json({ message: 'Unauthorized' });
        const payload = req.body || {};
        const result = await plantService.addPlantToRoom(userId, roomId, payload);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

export async function updatePlant(req, res) {
    try {
        const userId = req.user && req.user.userId;
        const userPlantID = Number(req.params.plantId);
        if (!userId) return res.status(401).json({ message: 'Unauthorized' });
        const updates = req.body || {};
        const result = await plantService.updateUserPlant(userId, userPlantID, updates);
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

export async function removePlant(req, res) {
    try {
        const userId = req.user && req.user.userId;
        const userPlantID = Number(req.params.plantId);
        if (!userId) return res.status(401).json({ message: 'Unauthorized' });
        const result = await plantService.removeUserPlant(userId, userPlantID);
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

export default { createRoom, getRooms, getRoom, updateRoom, deleteRoom, getPlants, addPlant, updatePlant, removePlant };
