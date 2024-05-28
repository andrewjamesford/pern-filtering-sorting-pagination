const express = require("express");
const Joi = require("joi");
const router = express.Router();
const queryParamValidationMiddleware = require("../middleware/queryParamValidationMiddleware");
const productRepository = require("./product.repository");

const queryParamsSchema = Joi.object().keys({
	sortOrder: Joi.string().allow(null, ""),
	direction: Joi.string().allow(null, ""),
});

const queryParamsPaginationSchema = Joi.object().keys({
	sortOrder: Joi.string().allow(null, ""),
	direction: Joi.string().allow(null, ""),
	page: Joi.number().integer().min(0).required(),
	pageSize: Joi.number().integer().min(1).required(),
});

router.get(
	"/",
	queryParamValidationMiddleware(queryParamsSchema),
	async (req, res, next) => {
		try {
			const { sortOrder = "id", direction = "asc" } = req.query;

			const products = await productRepository.getProducts(
				sortOrder,
				direction,
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

router.get(
	"/pagination/",
	queryParamValidationMiddleware(queryParamsPaginationSchema),
	async (req, res, next) => {
		try {
			const { sortOrder = "id", direction = "asc", page = 0, pageSize = 5 } = req.query;

			const products = await productRepository.getProductsPaginated(
				sortOrder,
				direction,
				page,
				pageSize,
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
