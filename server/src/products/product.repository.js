import db from "../db.js";

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
		throw Error(error);
	}
};

const getProductsPaginated = async (
	sortOrder,
	direction,
	page,
	pageSize,
	priceRange,
) => {
	try {
		let sortOrderParam = "p.name";
		const validSortOrders = ["name", "description", "price"];
		if (validSortOrders.includes(sortOrder.toLowerCase())) {
			sortOrderParam = `p.${sortOrder.toLowerCase()}`;
		}

		let directionParam = "ASC";
		if (direction.toLowerCase() === "desc") {
			directionParam = "DESC";
		}

		// Calculate the offset (how many rows to skip)
		const offset = (page - 1) * pageSize;

		const result = await db.query(
			`SELECT
              p.id,
              p.name,
              p.description,
              p.price,
              pi.name AS "imageName"
            FROM product p
            LEFT JOIN product_image pi ON p.product_image_id = pi.id
			WHERE p.price <= $3
            ORDER BY ${sortOrderParam} ${directionParam}
            LIMIT $1
			OFFSET $2`,
			[pageSize, offset, priceRange],
		);
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
		throw Error(error);
	}
};

export default {
	getProducts,
	getProductsPaginated,
};
