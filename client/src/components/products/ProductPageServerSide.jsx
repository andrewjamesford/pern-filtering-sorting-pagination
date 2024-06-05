import { useEffect, useState } from "react";
import api from "../../api";
import ErrorMessage from "../ErrorMessage";
import Loader from "../Loader";
import ProductList from "./ProductList";
import ProductPriceFilter from "./ProductPriceFilter";
import ProductSortOrder from "./ProductSortOrder";
import ProductsDisplayed from "./ProductsDisplayed";

const ProductPageServerSide = () => {
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
				const result = await api.getAllProducts();
				if (!result.ok) {
					throw new Error("API Error");
				}
				const data = await result.json();
				if (!abortController.signal.aborted) {
					const sortedProducts = sortOrder(
						data.products,
						sort,
						order,
						priceRange,
					);
					setOrigData(sortedProducts);
					setProducts(sortedProducts);
				}
			} catch (error) {
				console.error(error);
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
	}, [sort, order, priceRange]);

	const filterProductsByPrice = (products, price) => {
		return products.filter((product) => {
			const productPrice = product.price.replace("$", "");
			return Number.parseFloat(productPrice) <= Number.parseFloat(price);
		});
	};

	const sortProducts = (products, sortVal, orderVal) => {
		const sortedProducts = [...products].sort((a, b) => {
			if (typeof a[sortVal] === "number" && typeof b[sortVal] === "number") {
				return a[sortVal] - b[sortVal];
			}
			return a[sortVal].localeCompare(b[sortVal]);
		});

		if (orderVal.toLowerCase() === "desc") {
			sortedProducts.reverse();
		}

		return sortedProducts;
	};

	const sortOrder = (dataVal, sortVal, orderVal, priceRange) => {
		if (!dataVal || dataVal.length < 1) {
			return dataVal;
		}

		const filteredProducts = filterProductsByPrice(dataVal, priceRange);
		return sortProducts(filteredProducts, sortVal, orderVal);
	};

	const onFilterChange = (price) => {
		const filteredProducts = filterProductsByPrice(origData, price);
		setPriceRange(Number.parseFloat(price));
		setProducts(sortOrder(filteredProducts, sort, order, price));
	};

	const onSortChange = (e) => {
		const sortVal = e.target.value.toString();
		setSort(sortVal);
		setProducts(sortOrder(products, sortVal, order, priceRange));
	};

	const onOrderChange = (e) => {
		const orderVal = e.target.value.toString();
		setOrder(orderVal);
		setProducts(sortOrder(products, sort, orderVal, priceRange));
	};

	return (
		<main className="flex flex-col">
			<ProductPriceFilter onRangeChange={onFilterChange} price={priceRange} />
			<ProductSortOrder
				onSortChange={onSortChange}
				onOrderChange={onOrderChange}
			/>
			{error && <ErrorMessage message="Error fetching products" />}
			{loading ? (
				<Loader />
			) : (
				<>
					<ProductList products={products} />
					{products && <ProductsDisplayed productCount={products.length} />}
				</>
			)}
		</main>
	);
};

export default ProductPageServerSide;
