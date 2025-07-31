import db from "../db.js";

/**
 * Gets all products from the database
 * @returns {Promise<Array>} Array of product objects
 * @throws {Error} When database query fails
 */
const getProducts = async () => {
	try {
		const result = await db.query(
			`SELECT
        p.id,
        p.name,
        p.description,
        p.price,
        pi.name AS "imageName"
      FROM product p
      LEFT JOIN product_image pi ON p.product_image_id = pi.id
      ORDER BY p.name`,
		);

		return result.rows;
	} catch (error) {
		throw new Error(`Failed to fetch products: ${error.message}`);
	}
};

/**
 * Gets paginated products with filtering and sorting
 * @param {string} sortOrder - Column to sort by (name, description, price)
 * @param {string} direction - Sort direction (asc, desc)
 * @param {number} page - Page number (1-based)
 * @param {number} pageSize - Number of items per page
 * @param {number} priceRange - Maximum price filter
 * @returns {Promise<Object>} Object containing data, totalRecords, currentPage, totalPages
 * @throws {Error} When database query fails
 */

const getProductsPaginated = async (
	sortOrder,
	direction,
	page,
	pageSize,
	priceRange,
) => {
	try {
		// Define valid sort columns to prevent SQL injection
		const validSortColumns = {
			name: "p.name",
			description: "p.description", 
			price: "p.price"
		};
		
		// Use safe default if invalid sort order provided
		const sortColumn = validSortColumns[sortOrder?.toLowerCase()] || "p.name";
		
		// Validate direction parameter
		const sortDirection = direction?.toLowerCase() === "desc" ? "DESC" : "ASC";

		// Calculate the offset (how many rows to skip)
		const offset = (page - 1) * pageSize;

		// Use parameterized query with safe column/direction values
		const query = `
			SELECT
				p.id,
				p.name,
				p.description,
				p.price,
				pi.name AS "imageName"
			FROM product p
			LEFT JOIN product_image pi ON p.product_image_id = pi.id
			WHERE p.price <= $3
			ORDER BY ${sortColumn} ${sortDirection}
			LIMIT $1
			OFFSET $2`;

		const result = await db.query(query, [pageSize, offset, priceRange]);
		// Query to get the total number of records
		const totalRecordsResult = await db.query(
			"SELECT COUNT(*) AS total FROM product p WHERE p.price <= $1",
			[priceRange],
		);

		const totalRecords = totalRecordsResult.rows[0].total;

		return {
			data: result.rows,
			totalRecords,
			currentPage: page,
			totalPages: Math.ceil(totalRecords / pageSize),
		};
	} catch (error) {
		throw new Error(`Failed to fetch paginated products: ${error.message}`);
	}
};

export default {
	getProducts,
	getProductsPaginated,
};
