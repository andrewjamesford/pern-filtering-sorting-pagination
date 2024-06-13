import { useState, useCallback, useMemo } from "react";
import origData from "../../data/products.json";
import ProductList from "./ProductList";
import ProductPriceFilter from "./ProductPriceFilter";
import ProductSortOrder from "./ProductSortOrder";
import ProductsDisplayed from "./ProductsDisplayed";

function ProductPageClientSide() {
	const [sort, setSort] = useState("name");
	const [order, setOrder] = useState("asc");
	const [priceRange, setPriceRange] = useState(100);

	const filterProductsByPrice = useCallback((products, price) => {
		const parsedPrice = Number.parseFloat(price);
		return products.filter((product) => {
			const productPrice = Number.parseFloat(product.price.replace("$", ""));
			return productPrice <= parsedPrice;
		});
	}, []);

	const sortProducts = useCallback((products, sortVal, orderVal) => {
		return [...products].sort((a, b) => {
			const compareVal =
				typeof a[sortVal] === "number" && typeof b[sortVal] === "number"
					? a[sortVal] - b[sortVal]
					: a[sortVal].localeCompare(b[sortVal]);

			return orderVal.toLowerCase() === "desc" ? -compareVal : compareVal;
		});
	}, []);

	const products = useMemo(() => {
		return sortProducts(
			filterProductsByPrice(origData.products, priceRange),
			sort,
			order,
		);
	}, [sort, order, priceRange, filterProductsByPrice, sortProducts]);

	const sortOrder = useCallback(
		(dataVal, sortVal, orderVal, priceRange) => {
			if (!dataVal || dataVal.length < 1) {
				return dataVal;
			}

			const filteredProducts = filterProductsByPrice(dataVal, priceRange);
			return sortProducts(filteredProducts, sortVal, orderVal);
		},
		[filterProductsByPrice, sortProducts],
	);

	const onFilterChange = useCallback(
		debounce((price) => {
			const parsedPrice = Number.parseFloat(price);
			setPriceRange(parsedPrice);
		}, 300),
		[],
	);

	const onSortChange = useCallback((e) => {
		const sortVal = e.target.value.toString();
		setSort(sortVal);
	}, []);

	const onOrderChange = useCallback((e) => {
		const orderVal = e.target.value.toString();
		setOrder(orderVal);
	}, []);

	return (
		<main className="flex flex-col">
			<ProductPriceFilter onRangeChange={onFilterChange} price={priceRange} />
			<ProductSortOrder
				onSortChange={onSortChange}
				onOrderChange={onOrderChange}
			/>
			{products && products.length > 0 && (
				<>
					{products && (
						<>
							<ProductList products={products} />
							<ProductsDisplayed productCount={products?.length} />
						</>
					)}
				</>
			)}
		</main>
	);
}

export default ProductPageClientSide;
