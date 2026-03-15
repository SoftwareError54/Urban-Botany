import express from 'express';
import * as plantController from '../Controllers/plantController.js';
import {authenticateToken} from '../Middleware/authMiddleware.js';

const router = express.Router();

router.get('/', plantController.getAllPlants)


router.get('/alldecorations', plantController.getAllPlantDecorations);
router.get('/decorations/:decorationId', plantController.getPlantDecorationById);
router.get('/myplants/:plantId/decoration', authenticateToken, plantController.getDecorationByPlantId);

router.get('/myplants', authenticateToken, plantController.getMyPlants)
router.get('/:plantId', plantController.getPlantById);
// router.post('/', plantController.addDecorationByPlantId);

export default router;