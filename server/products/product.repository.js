const db = require("../db");

module.exports = {
  getProducts: async (sortOrder, direction) => {
    try {
      let sortOrderParam = "p.id";

      if (sortOrder.toLowerCase() === "name") {
        sortOrderParam = "p.name";
      }
      if (sortOrder.toLowerCase() === "description") {
        sortOrderParam = "p.description";
      }
      if (sortOrder.toLowerCase() === "price") {
        sortOrderParam = "p.price";
      }
      if (sortOrder.toLowerCase() === "discountAmount") {
        sortOrderParam = "p.discount_amount";
      }

      if (direction.toLowerCase() === "desc") {
        sortOrderParam = sortOrderParam + " DESC";
      }

      const result = await db.query(
        `SELECT
          p.id,
          p.name,
          p.description,
          p.price,
          p.discount_amount AS "discountAmount",
          pc.name AS "categoryName",
          pi.name AS "imageName",
          pi.description AS "imageDescription"
        FROM product p
        LEFT JOIN product_category pc ON p.product_category_id = pc.id
        LEFT JOIN product_image pi ON p.product_image_id = pi.id
        ORDER BY ${sortOrderParam}`
      );
      return result.rows;
    } catch (error) {
      throw Error(error);
    }
  },
};
