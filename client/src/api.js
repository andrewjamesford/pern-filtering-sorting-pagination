const api = {
	getProductsClientSide: async () =>
		await fetch(`./products.json`
		),
	getProductsServerSide: async () =>
		await fetch(
			`${import.meta.env.VITE_API_URL}/products`,
		),
	getProductsServerSidePagination: async (sort, order, page, pageSize, searchString) =>
		await fetch(
			`${import.meta.env.VITE_API_URL}/products/pagination?sortOrder=${sort}&direction=${order}&page=${page}&pageSize=${pageSize}&searchString=${searchString}`,
		),
};

export default api;
