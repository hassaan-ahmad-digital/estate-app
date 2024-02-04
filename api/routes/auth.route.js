import express from 'express';
import { signin, signup, google } from '../controllers/index.js';

export const authRouter = express.Router();

authRouter.post('/signup', signup) 
authRouter.post('/signin', signin)
authRouter.post('/google', google)