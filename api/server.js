import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { userRouter } from './routes/index.js';
dotenv.config();
mongoose
    .connect(process.env.MONGODB_CONNECTION_STRING)
    .then(() => console.log("Connected to Database"))
    .catch(err => console.error(err));
const app = express();
app.use(express.json());
const port = 8000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
app.use('/api/users/', userRouter);
