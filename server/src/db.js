import pkg from "pg";
const { Pool, types } = pkg;

// pg won't cast by default as may lose precision.
types.setTypeParser(1700, (val) => Number.parseFloat(val));

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: process.env.DATABASE_URL
		? {
				rejectUnauthorized: false,
			}
		: false,
});

export default {
	query: (text, params, callback) => {
		return pool.query(text, params, callback);
	},
	end: () => {
		pool.end();
	},
};
