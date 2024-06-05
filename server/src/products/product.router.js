import express from "express";
import Joi from "joi";
import queryParamValidationMiddleware from "../middleware/queryParamValidationMiddleware.js";
import productRepository from "./product.repository.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const products = await productRepository.getProducts();

    const responseResults = {
      products,
    };

    return res.json(responseResults);
  } catch (err) {
    next(err);
  }
});

const queryParamsSchema = Joi.object().keys({
  sortOrder: Joi.string()
    .pattern(/^[a-z]+$/i)
    .allow(null, ""),
  direction: Joi.string()
    .pattern(/^[a-z]+$/i)
    .allow(null, ""),
  page: Joi.number().integer().min(0).required(),
  pageSize: Joi.number().integer().min(1).required(),
  priceRange: Joi.number().integer().min(20).max(100).required(),
});

router.get(
  "/data/",
  queryParamValidationMiddleware(queryParamsSchema),
  async (req, res, next) => {
    try {
      const {
        sortOrder = "name",
        direction = "asc",
        page = 0,
        pageSize = 5,
        priceRange = 20,
      } = req.query;

      const products = await productRepository.getProductsPaginated(
        sortOrder,
        direction,
        page,
        pageSize,
        priceRange
      );

      const responseResults = {
        products,
      };

      return res.json(responseResults);
    } catch (err) {
      next(err);
    }
  }
);

export default router;
