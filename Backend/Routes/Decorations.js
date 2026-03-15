import express from 'express';
import * as decorationController from '../Controllers/decorationController.js';

const router = express.Router();

router.get('/', decorationController.getAllRoomDecorations);
router.get('/', decorationController.getRoomDecorationById);

router.get('/', decorationController.getDecorationByRoomId);
router.post('/', decorationController.addDecorationByRoomId);

export default router;