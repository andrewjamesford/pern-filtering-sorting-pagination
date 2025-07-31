/**
 * Environment validation utility
 * Ensures required environment variables are set
 */

/**
 * Required environment variables for the application
 */
const REQUIRED_ENV_VARS = [
	'PGDATABASE',
	'PGHOST', 
	'PGUSER',
	'PGPASSWORD',
	'PGPORT'
];

/**
 * Validates that all required environment variables are set
 * @throws {Error} When required environment variables are missing
 */
export const validateEnvironment = () => {
	const missing = REQUIRED_ENV_VARS.filter(varName => !process.env[varName]);
	
	if (missing.length > 0) {
		throw new Error(
			`Missing required environment variables: ${missing.join(', ')}\nPlease check your .env file or environment configuration.`
		);
	}
	
	console.log('✓ Environment validation passed');
};

/**
 * Gets the current environment (development, production, etc.)
 * @returns {string} Current environment
 */
export const getEnvironment = () => {
	return process.env.NODE_ENV || 'development';
};

/**
 * Checks if running in development mode
 * @returns {boolean} True if in development mode
 */
export const isDevelopment = () => {
	return getEnvironment() === 'development';
};

export default {
	validateEnvironment,
	getEnvironment,
	isDevelopment
};