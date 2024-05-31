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

const queryParamsPaginationSchema = Joi.object().keys({
	sortOrder: Joi.string().pattern(/^[a-z0-9 ]+$/i).allow(null, ""),
	direction: Joi.string().pattern(/^[a-z0-9 ]+$/i).allow(null, ""),
	page: Joi.number().integer().min(0).required(),
	pageSize: Joi.number().integer().min(1).required(),
	searchString: Joi.string().pattern(/^[a-z0-9 ]+$/i).allow(null, ""),
});

router.get(
	"/pagination/",
	queryParamValidationMiddleware(queryParamsPaginationSchema),
	async (req, res, next) => {
		try {
			const { sortOrder = "id", direction = "asc", page = 0, pageSize = 5, searchString = "" } = req.query;

			const products = await productRepository.getProductsPaginated(
				sortOrder,
				direction,
				page,
				pageSize,
				searchString
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
