import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import productRouter from "./products/product.router.js";

dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/products", productRouter);

// error handling middleware
app.use(errorHandlerMiddleware);

export default app;
