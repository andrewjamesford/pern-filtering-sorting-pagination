import express from "express";
import Joi from "joi";
import queryParamValidationMiddleware from "../middleware/queryParamValidationMiddleware.js";
import productRepository from "./product.repository.js";

const router = express.Router();

// Constants for validation
const VALIDATION_CONSTANTS = {
	MIN_PAGE: 1,
	MIN_PAGE_SIZE: 1,
	MAX_PAGE_SIZE: 100,
	MIN_PRICE: 20,
	MAX_PRICE: 100,
	DEFAULT_SORT: "name",
	DEFAULT_DIRECTION: "asc",
	DEFAULT_PAGE: 1,
	DEFAULT_PAGE_SIZE: 5,
	DEFAULT_PRICE_RANGE: 100,
	VALID_SORT_ORDERS: ["name", "description", "price"],
	VALID_DIRECTIONS: ["asc", "desc"]
};

/**
 * Get all products without pagination
 */
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
		.valid(...VALIDATION_CONSTANTS.VALID_SORT_ORDERS)
		.allow(null, ""),
	direction: Joi.string()
		.valid(...VALIDATION_CONSTANTS.VALID_DIRECTIONS)
		.allow(null, ""),
	page: Joi.number()
		.integer()
		.min(VALIDATION_CONSTANTS.MIN_PAGE)
		.required(),
	pageSize: Joi.number()
		.integer()
		.min(VALIDATION_CONSTANTS.MIN_PAGE_SIZE)
		.max(VALIDATION_CONSTANTS.MAX_PAGE_SIZE)
		.required(),
	priceRange: Joi.number()
		.integer()
		.min(VALIDATION_CONSTANTS.MIN_PRICE)
		.max(VALIDATION_CONSTANTS.MAX_PRICE)
		.required(),
});

/**
 * Get paginated products with filtering and sorting
 */

router.get(
	"/data/",
	queryParamValidationMiddleware(queryParamsSchema),
	async (req, res, next) => {
		try {
			const {
				sortOrder = VALIDATION_CONSTANTS.DEFAULT_SORT,
				direction = VALIDATION_CONSTANTS.DEFAULT_DIRECTION,
				page = VALIDATION_CONSTANTS.DEFAULT_PAGE,
				pageSize = VALIDATION_CONSTANTS.DEFAULT_PAGE_SIZE,
				priceRange = VALIDATION_CONSTANTS.DEFAULT_PRICE_RANGE,
			} = req.query;

			const products = await productRepository.getProductsPaginated(
				sortOrder,
				direction,
				Number.parseInt(page, 10),
				Number.parseInt(pageSize, 10),
				Number.parseInt(priceRange, 10),
			);

			const responseResults = {
				products,
			};

			return res.json(responseResults);
		} catch (err) {
			next(err);
		}
	},
);

export default router;
