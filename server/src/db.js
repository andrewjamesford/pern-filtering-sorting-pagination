import pkg from "pg";
const { Pool, types } = pkg;

// pg won't cast by default as may lose precision.
types.setTypeParser(1700, (val) => Number.parseFloat(val));

/**
 * PostgreSQL connection pool configuration
 * Supports both local development and production with SSL
 */
const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: process.env.DATABASE_URL
		? {
				rejectUnauthorized: false,
			}
		: false,
});

/**
 * Database connection and query interface
 */
export default {
	/**
	 * Execute a database query
	 * @param {string} text - SQL query string
	 * @param {Array} params - Query parameters
	 * @param {Function} callback - Optional callback function
	 * @returns {Promise} Query result
	 */
	query: (text, params, callback) => {
		return pool.query(text, params, callback);
	},
	
	/**
	 * Close all database connections
	 */
	end: () => {
		pool.end();
	},
};
