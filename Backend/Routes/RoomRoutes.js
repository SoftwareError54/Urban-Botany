import express from 'express';
import * as roomController from '../Controllers/RoomsController.js';

const router = express.Router();

router.get('/:uid', roomController.getRoomsByUserId);
router.get('/room/:roomId', roomController.getRoomById);;


export default router;