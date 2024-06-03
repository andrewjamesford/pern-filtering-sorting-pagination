const api = {
	getAllProducts: async () =>
		await fetch(`${import.meta.env.VITE_API_URL}/products`),
	getProductsFilterSortPagination: async (
		sort,
		order,
		page,
		pageSize,
		priceRange,
	) =>
		await fetch(
			`${
				import.meta.env.VITE_API_URL
			}/products/data?sortOrder=${sort}&direction=${order}&page=${page}&pageSize=${pageSize}&priceRange=${priceRange}`,
		),
};

export default api;
