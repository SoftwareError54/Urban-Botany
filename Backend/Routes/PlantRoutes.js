import express from 'express';
import * as plantController from '../Controllers/PlantController.js';
import {authenticateToken} from '../Middleware/authMiddleware.js';

const router = express.Router();

router.get('/', plantController.getAllPlants)


router.get('/alldecorations', plantController.getAllPlantDecorations);
router.get('/decorations/:decorationId', plantController.getPlantDecorationById);
router.get('/myplants/:plantId/decoration', authenticateToken, plantController.getDecorationByPlantId);
router.get('/myplants/:plantId/decorations/all', authenticateToken, plantController.getAllDecorationsByUserPlantId);
router.put('/myplants/:plantId/decorations/update/:decorationId', authenticateToken, plantController.updatePlantDecoration);
router.put('/myplants/:plantId/decorations/reset/:layer', authenticateToken, plantController.resetPlantDecoration);

router.get('/myplants', authenticateToken, plantController.getMyPlants)
router.get('/room/:roomId', plantController.getPlantsByRoomId)
router.post('/identify', plantController.identifyPlant);
router.get('/bylatin', plantController.getPlantByLatinName);
// Parameter routes should come last so they don't capture specific paths like '/bylatin'
router.get('/:plantId', plantController.getPlantById);
// router.post('/', plantController.addDecorationByPlantId);

export default router;