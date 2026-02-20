import express from 'express';
import { authenticateToken } from '../Middleware/authMiddleware.js';
import {
    createRoom,
    getRooms,
    getRoom,
    updateRoom,
    deleteRoom,
    getPlants,
    addPlant,
    updatePlant,
    removePlant
} from '../Controllers/RoomController.js';

const router = express.Router();

router.use(authenticateToken);

// Rooms
router.post('/', createRoom);
router.get('/', getRooms);
router.get('/:id', getRoom);
router.patch('/:id', updateRoom);
router.delete('/:id', deleteRoom);

// Plants within a room
router.get('/:id/plants', getPlants);
router.post('/:id/plants', addPlant);
router.patch('/:id/plants/:plantId', updatePlant);
router.delete('/:id/plants/:plantId', removePlant);

export default router;
