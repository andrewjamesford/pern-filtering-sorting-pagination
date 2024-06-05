import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import productRouter from "./products/product.router.js";
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";

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
