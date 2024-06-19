import { useEffect, useState } from "react";
import api from "../../api";
import ErrorMessage from "../ErrorMessage";
import Loader from "../Loader";
import ProductList from "./ProductList";
import ProductPriceFilter from "./ProductPriceFilter";
import ProductSortOrder from "./ProductSortOrder";
import ProductsDisplayed from "./ProductsDisplayed";

function ProductPageServerSide() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [products, setProducts] = useState([]);
	const [sort, setSort] = useState("name");
	const [order, setOrder] = useState("asc");
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
					setProducts(
						sortProducts(
							filterProductsByPrice(data.products, priceRange),
							sort,
							order,
						),
					);
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
		const parsedPrice = Number.parseFloat(price);

		const filteredProducts = products.filter((product) => {
			const productPrice = Number.parseFloat(product.price.replace("$", ""));
			return productPrice <= parsedPrice;
		});
		return filteredProducts;
	};

	const sortProducts = (products, sortVal, orderVal) => {
		return [...products].sort((a, b) => {
			const compareVal =
				typeof a[sortVal] === "number" && typeof b[sortVal] === "number"
					? a[sortVal] - b[sortVal]
					: a[sortVal].localeCompare(b[sortVal]);

			return orderVal.toLowerCase() === "desc" ? -compareVal : compareVal;
		});
	};

	const onFilterChange = (price) => {
		const parsedPrice = Number.parseFloat(price);
		setPriceRange(parsedPrice);
	};

	const onSortChange = (e) => {
		const sortVal = e.target.value.toString();
		setSort(sortVal);
	};

	const onOrderChange = (e) => {
		const orderVal = e.target.value.toString();
		setOrder(orderVal);
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
}

export default ProductPageServerSide;
