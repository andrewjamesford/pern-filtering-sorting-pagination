const api = {
	getProductsClientSide: async () =>
		await new Promise((resolve) =>
			setTimeout(() => {
				resolve(fetch(`./products.json`));
			}, 2000),
		),
	getProductsServerSide: async (sort, order) =>
		await fetch(
			`${import.meta.env.VITE_API_URL}/products?sortOrder=${sort}&direction=${order}`,
		),
	getProductsServerSidePagination: async (sort, order, page, length) =>
		await fetch(
			`${import.meta.env.VITE_API_URL}/products/pagination?sortOrder=${sort}&direction=${order}&page=${page}&length=${length}`,
		),
};

export default api;
