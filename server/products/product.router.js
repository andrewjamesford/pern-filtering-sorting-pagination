const express = require("express");
const Joi = require("joi");
const router = express.Router();
const queryParamValidationMiddleware = require("../middleware/queryParamValidationMiddleware");
const productRepository = require("./product.repository");

router.get(
	"/",
	async (req, res, next) => {
		try {

			const products = await productRepository.getProducts();

			const responseResults = {
				products,
			};

			return res.json(responseResults);
		} catch (err) {
			next(err);
		}
	},
);

const queryParamsSchema = Joi.object().keys({
	sortOrder: Joi.string().pattern(/^[a-z0-9 ]+$/i).allow(null, ""),
	direction: Joi.string().pattern(/^[a-z0-9 ]+$/i).allow(null, ""),
	page: Joi.number().integer().min(0).required(),
	pageSize: Joi.number().integer().min(1).required(),
	priceRange: Joi.number().integer().min(20).max(100).required(),
});

router.get(
	"/data/",
	queryParamValidationMiddleware(queryParamsSchema),
	async (req, res, next) => {
		try {
			const { sortOrder = "name", direction = "asc", page = 0, pageSize = 5, priceRange = 20 } = req.query;

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
	},
);


module.exports = router;
