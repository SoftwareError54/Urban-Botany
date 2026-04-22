import express from 'express';
import * as roomController from '../Controllers/RoomsController.js';

const router = express.Router();


router.get('/room/:roomId', roomController.getRoomById);

router.get('/:roomId/decorations/alldecorations', roomController.getAllRoomDecorations);
router.get('/:roomId/decorations/decoration/:decorationId', roomController.getRoomDecorationById);

router.get('/:roomId/decorations', roomController.getDecorationsByRoomId);
router.get('/:roomId/decorations/all', roomController.getAllDecorationsByRoomId);
router.post('/:roomId/decorations/newdecoration/:decorationId', roomController.addDecoration);
router.put('/:roomId/decorations/update/:decorationId', roomController.updateDecorationByLayer);
router.put('/:roomId/decorations/reset/:layer', roomController.resetDecorationsByLayer);
router.post('/addroom', roomController.addRoom);
router.get('/:uid', roomController.getRoomsByUserId);

export default router;