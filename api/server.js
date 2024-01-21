import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from 'cors';
import { authRouter, userRouter } from './routes/index.js';

const port = 8000;

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Enable credentials (cookies, authorization headers, etc.)
};


dotenv.config();

mongoose
    .connect(process.env.MONGODB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to Database"))
    .catch(err => console.error(err));

const app = express();

app.use(express.json());
app.use(cors(corsOptions));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

app.use('/v1/users', userRouter);
app.use('/v1/auth', authRouter)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || "Internal Server Error"

    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})