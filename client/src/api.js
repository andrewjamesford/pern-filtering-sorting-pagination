/**
 * API client for product operations
 * Provides methods to interact with the backend API
 */
const api = {
	/**
	 * Fetch all products from the API
	 * @returns {Promise<Response>} API response
	 * @throws {Error} When request fails
	 */
	getAllProducts: async () => {
		const response = await fetch(`${import.meta.env.VITE_API_URL}/products`);
		if (!response.ok) {
			throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
		}
		return response;
	},

	/**
	 * Fetch filtered, sorted, and paginated products
	 * @param {string} sort - Sort field
	 * @param {string} order - Sort order (asc/desc)
	 * @param {number} page - Page number
	 * @param {number} pageSize - Items per page
	 * @param {number} priceRange - Maximum price filter
	 * @returns {Promise<Response>} API response
	 * @throws {Error} When request fails
	 */
	getProductsFilterSortPagination: async (
		sort,
		order,
		page,
		pageSize,
		priceRange,
	) => {
		const url = new URL(`${import.meta.env.VITE_API_URL}/products/data`);
		url.searchParams.set('sortOrder', sort);
		url.searchParams.set('direction', order);
		url.searchParams.set('page', page.toString());
		url.searchParams.set('pageSize', pageSize.toString());
		url.searchParams.set('priceRange', priceRange.toString());

		const response = await fetch(url.toString());
		if (!response.ok) {
			throw new Error(`Failed to fetch paginated products: ${response.status} ${response.statusText}`);
		}
		return response;
	},
};

export default api;
