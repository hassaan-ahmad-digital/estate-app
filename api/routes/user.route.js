import express from "express";
import { test } from "../controllers/index.js";
export const userRouter = express.Router();
userRouter.get("/test", test);
