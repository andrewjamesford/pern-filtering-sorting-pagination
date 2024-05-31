/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import api from "../../api";
import ProductList from "./ProductList";
import ProductSortOrder from "./ProductSortOrder";
import Loader from "../Loader";
import ErrorMessage from "../ErrorMessage";
import ProductPriceRange from "./ProductPriceRange";

const ProductPageClientSide = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [products, setProducts] = useState([]);
	const [sort, setSort] = useState("name");
	const [order, setOrder] = useState("asc");
	const [origData, setOrigData] = useState([]);
	const [priceRange, setPriceRange] = useState(100);

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
				setOrigData(data.products);
				if (!abortController.signal.aborted) {
					const sortedProducts = sortOrder(
						data.products,
						sort,
						order,
						priceRange,
					);
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

	const filterPriceRange = (data, price) => {
		let filteredProducts = origData;
		if (data && data.length > 0) {
			filteredProducts = data.filter((product) => {
				const productPrice = product.price.replace("$", "");
				return parseFloat(productPrice) <= parseFloat(price);
			});
		}
		setPriceRange(parseFloat(price));
		setProducts(filteredProducts);
		return filteredProducts;
	};

	const onFilterChange = (price) => {
		sortOrder(origData, sort, order, price);
	};

	const sortOrder = (dataVal, sortVal, orderVal, priceRange) => {
		if (!dataVal || dataVal.length < 1) {
			return dataVal;
		}
		const dataFiltered = filterPriceRange(dataVal, priceRange);
		// Client-side sorting
		const sortProductsBy = dataFiltered.sort((a, b) => {
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
		setProducts(sortOrder(products, sortVal, order, priceRange));
	};

	const onOrderChange = (e) => {
		const orderVal = e.target.value + "";
		setOrder(orderVal);
		setProducts(sortOrder(products, sort, orderVal, priceRange));
	};

	return (
		<main className="flex flex-col">
			<ProductPriceRange onRangeChange={onFilterChange} price={priceRange} />
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
