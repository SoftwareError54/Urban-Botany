import express from 'express';
import * as roomController from '../Controllers/RoomsController.js';

const router = express.Router();


router.get('/room/:roomId', roomController.getRoomById);;

router.get('/:roomId/decorations/alldecorations', roomController.getAllRoomDecorations);
router.get('/:roomId/decorations/decoration/:decorationId', roomController.getRoomDecorationById);

router.get('/:roomId/decorations', roomController.getDecorationsByRoomId);
router.post('/:roomId/decorations/newdecoration/:decorationId', roomController.addDecoration);
router.get('/:uid', roomController.getRoomsByUserId);

export default router;