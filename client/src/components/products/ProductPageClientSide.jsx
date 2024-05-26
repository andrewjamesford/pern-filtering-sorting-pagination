import { useEffect, useState } from "react";
import api from "../../api";
import ProductList from "./ProductList";
import ProductSortOrder from "./ProductSortOrder";
import Loader from "../Loader";
import ErrorMessage from "../ErrorMessage";
import ProductSearch from "./ProductSearch";

const ProductPageClientSide = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [products, setProducts] = useState([]);
	const [sort, setSort] = useState("id");
	const [order, setOrder] = useState("asc");
	const [search, setSearch] = useState("");

	useEffect(() => {
		// We use AbortController (https://developer.mozilla.org/en-US/docs/Web/API/AbortController)
		// to clean up so that we don’t introduce a memory leak
		// (https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup)
		const abortController = new AbortController();

		const fetchData = async () => {
			try {
				setLoading(true);
				setError(false);
				const result = await api.getProductsClientSide();
				if (!result.ok) {
					throw new Error("API Error");
				}
				const data = await result.json();
				if (!abortController.signal.aborted) {
					// Client-side sorting
					const sortProductsBy = data.products.sort((a, b) => {
						if (typeof a[sort] === "number" && typeof b[sort] === "number") {
							return a[sort] - b[sort];
						} else {
							return a[sort].localeCompare(b[sort]);
						}
					});
					// Client-side ordering
					if (order.toLowerCase() === "desc") {
						sortProductsBy.reverse();
					}
					setProducts(sortProductsBy);
				}
			} catch (error) {
				if (!abortController.signal.aborted) {
					setError(true);
				}
			} finally {
				if (!abortController.signal.aborted) {
					setLoading(false);
				}
			}
		};

		fetchData();

		return () => abortController.abort();
	}, [sort, order]);

	const onSortChange = (e) => {
		setSort(e.target.value + "");
	};

	const onOrderChange = (e) => {
		setOrder(e.target.value + "");
	};

	const onSearchChange = (searchInput) => {
		const searchValue = searchInput.toLowerCase();

		if (!searchValue) {
			setSearch("");
			return;
		}

		const filteredProducts = products.filter((product) => {
			return (
				product.name.toLowerCase().includes(searchValue) ||
				product.description.toLowerCase().includes(searchValue)
			);
		});
		setProducts(filteredProducts);
	};

	return (
		<main className="flex flex-col">
			<ProductSearch handleSearch={onSearchChange} search={search} />
			<ProductSortOrder
				onSortChange={onSortChange}
				onOrderChange={onOrderChange}
			/>
			{error && <ErrorMessage message="Error fetching products" />}
			{loading ? <Loader /> : <ProductList products={products} />}
		</main>
	);
};

export default ProductPageClientSide;
