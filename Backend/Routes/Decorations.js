import express from 'express';
import * as decorationController from '../Controllers/decorationController.js';

const router = express.Router();

router.get('/', decorationController.getAllPlantDecorations);
router.get('/', decorationController.getAllPlantDecorations);
router.get('/', decorationController.getRoomDecorationById);
router.get('/', decorationController.getPlantDecorationById);
router.get('/', decorationController.getDecorationByRoomId);
router.get('/', decorationController.getDecorationByPlantId);

router.post('/', decorationController.addDecorationByPlantId);
router.post('/', decorationController.addDecorationByRoomId);

export default router;