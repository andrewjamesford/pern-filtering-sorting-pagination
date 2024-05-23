const api = {
  getProducts: async (sort, order) =>
    await fetch(`${import.meta.env.VITE_API_URL}/products?sortOrder=${sort}&direction=${order}`),
  getReports: async (accessToken) =>
    await fetch(`${import.meta.env.VITE_API_URL}/reports`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }),
};

export default api;
