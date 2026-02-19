import express from 'express';
import { updateField, updateFields, changePassword } from '../Controllers/ProfileController.js';
import { authenticateToken } from '../Middleware/authMiddleware.js';

const router = express.Router();

router.use(authenticateToken);

// Update a single field: { field, value }
router.patch('/field', updateField);

// Update multiple fields: send JSON with allowed fields as keys
router.patch('/', updateFields);

// Change password: { currentPassword, newPassword }
router.patch('/password', changePassword);

export default router;
