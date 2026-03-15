import express from 'express';
import * as plantController from '../Controllers/plantController.js';

const router = express.Router();

router.get('/', plantController.getAllPlants)
router.get('/:plantId', plantController.getPlantById);

router.get('/', decorationController.getAllPlantDecorations);
router.get('/', decorationController.getPlantDecorationById);
router.get('/', decorationController.getDecorationByPlantId);
router.post('/', decorationController.addDecorationByPlantId);

export default router;