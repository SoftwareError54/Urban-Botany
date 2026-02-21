import express from 'express';
import * as userPlantController from '../Controllers/UserPlantController.js';

const router = express.Router();

router.get('/:userId', userPlantController.getUserPlantsByUserId);
router.get('/userplant/:userPlantId', userPlantController.getUserPlantById);

export default router;