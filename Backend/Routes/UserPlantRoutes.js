import express from 'express';
import * as userPlantController from '../Controllers/UserPlantController.js';
import { authenticateToken } from '../Middleware/authMiddleware.js';

const router = express.Router();

router.get('/:userId', userPlantController.getUserPlantsByUserId);
router.get('/userplant/:userPlantId', userPlantController.getUserPlantById);

// create user plant (protected)
router.post('/', authenticateToken, userPlantController.addUserPlant);
// update user plant (protected)
router.put('/:userPlantId', authenticateToken, userPlantController.updateUserPlant);

export default router;