import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import productRouter from "./products/product.router.js";
import { validateEnvironment } from "./utils/env.js";

// Load environment variables first
dotenv.config();

// Validate environment configuration
validateEnvironment();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/products", productRouter);

// error handling middleware
app.use(errorHandlerMiddleware);

export default app;
