const api = {
	getProductsClientSide: async () =>
		await fetch(`./products.json`
		),
	getProductsServerSide: async (sort, order) =>
		await fetch(
			`${import.meta.env.VITE_API_URL}/products?sortOrder=${sort}&direction=${order}`,
		),
	getProductsServerSidePagination: async (sort, order, page, pageSize, searchString) =>
		await fetch(
			`${import.meta.env.VITE_API_URL}/products/pagination?sortOrder=${sort}&direction=${order}&page=${page}&pageSize=${pageSize}&searchString=${searchString}`,
		),
};

export default api;
