import express from 'express';
import {signup, authenticate} from '../Controllers/AuthController.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', authenticate);

export default router;