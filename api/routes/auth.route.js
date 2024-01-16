import express from 'express';
import { signup } from '../controllers/index.js';

export const authRouter = express.Router();

authRouter.post('/signup', signup) 