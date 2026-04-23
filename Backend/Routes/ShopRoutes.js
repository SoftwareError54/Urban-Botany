import express from 'express';
import { authenticateToken } from '../Middleware/authMiddleware.js';
import { buyDecoration } from '../Controllers/ShopController.js';

const router = express.Router();

// POST /shop/buy  — purchase a decoration, deduct points, assign to room/plant
router.post('/buy', authenticateToken, buyDecoration);

export default router;
