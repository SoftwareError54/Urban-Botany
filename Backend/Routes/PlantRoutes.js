import express from 'express';
import * as plantController from '../Controllers/plantController.js';

const router = express.Router();

router.get('/', plantController.getAllPlants)
router.get('/:plantId', plantController.getPlantById);

export default router;