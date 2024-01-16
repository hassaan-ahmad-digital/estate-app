import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { authRouter, userRouter } from './routes/index.js';

const port = 8000;

dotenv.config();

mongoose
    .connect(process.env.MONGODB_CONNECTION_STRING)
    .then(() => console.log("Connected to Database"))
    .catch(err => console.error(err));

const app = express();

app.use(express.json());

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter)