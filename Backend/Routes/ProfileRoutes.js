import express from 'express';

import * as profileController from '../Controllers/ProfileController.js';
const router = express.Router();

router.get('/:userId', profileController.getProfileByUserId);

export default router;