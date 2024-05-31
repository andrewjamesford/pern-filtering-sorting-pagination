/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import api from "../../api";
import ProductList from "./ProductList";
import ProductSortOrder from "./ProductSortOrder";
import Loader from "../Loader";
import ErrorMessage from "../ErrorMessage";
import ProductSearch from "./ProductSearch";

const ProductPageServerSide = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [products, setProducts] = useState([]);
	const [sort, setSort] = useState("name");
	const [order, setOrder] = useState("asc");
	const [search, setSearch] = useState("");
	const [origData, setOrigData] = useState([]);

	useEffect(() => {
		// We use AbortController (https://developer.mozilla.org/en-US/docs/Web/API/AbortController)
		// to clean up so that we don’t introduce a memory leak
		// (https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup)
		const abortController = new AbortController();

		const fetchData = async () => {
			try {
				setLoading(true);
				setError(false);
				const result = await api.getProductsServerSide();
				if (!result.ok) {
					throw new Error("API Error");
				}
				const data = await result.json();
				setOrigData(data.products);
				if (!abortController.signal.aborted) {
					const sortedProducts = sortOrder(data.products, sort, order);
					setProducts(sortedProducts);
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
	}, []);

	const sortOrder = (dataVal, sortVal, orderVal) => {
		if (!dataVal || !dataVal.length) {
			return dataVal;
		}
		// Client-side sorting
		const sortProductsBy = dataVal.sort((a, b) => {
			if (typeof a[sortVal] === "number" && typeof b[sortVal] === "number") {
				return a[sortVal] - b[sortVal];
			} else {
				return a[sortVal].localeCompare(b[sortVal]);
			}
		});
		// Client-side ordering
		if (orderVal.toLowerCase() === "desc") {
			sortProductsBy.reverse();
		}

		return sortProductsBy;
	};

	const onSortChange = (e) => {
		const sortVal = e.target.value + "";
		setSort(sortVal);
		setProducts(sortOrder(products, sortVal, order));
	};

	const onOrderChange = (e) => {
		const orderVal = e.target.value + "";
		setOrder(orderVal);
		setProducts(sortOrder(products, sort, orderVal));
	};

	const onSearchChange = (searchInput) => {
		const searchValue = searchInput.toLowerCase();

		if (searchValue === "") {
			setSearch("");
			setProducts(origData);
			return;
		}

		const filteredProducts = origData.filter((product) => {
			return (
				product.name.toLowerCase().includes(searchValue) ||
				product.description.toLowerCase().includes(searchValue)
			);
		});
		const sortedProducts = sortOrder(filteredProducts, sort, order);
		setProducts(sortedProducts);
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

export default ProductPageServerSide;
