/**
 * Middleware for validating query parameters using Joi schema
 * @param {Object} schema - Joi validation schema
 * @returns {Function} Express middleware function
 */
const queryParamValidationMiddleware = (schema) => (req, res, next) => {
	const { error } = schema.validate(req.query);

	if (error) {
		const { details } = error;
		const message = details.map((detail) => detail.message).join(", ");

		// Return proper error status code instead of 200
		return res.status(400).json({ 
			error: "Validation failed",
			message: message 
		});
	}
	
	next();
};

export default queryParamValidationMiddleware;
