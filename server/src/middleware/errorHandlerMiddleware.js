/**
 * Global error handling middleware
 * @param {Error} err - Error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const errorHandlerMiddleware = (err, req, res, next) => {
	// Log error for debugging (in production, use proper logging)
	console.error('Error:', err.message);
	
	// Set default error status and message
	const status = err.status || err.statusCode || 500;
	const message = err.message || 'Internal Server Error';
	
	res.status(status).json({
		error: true,
		message: message,
		...(process.env.NODE_ENV === 'development' && { stack: err.stack })
	});
};

export default errorHandlerMiddleware;
