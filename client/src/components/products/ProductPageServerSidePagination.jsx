import { useEffect, useState } from "react";
import api from "../../api";
import ErrorMessage from "../ErrorMessage";
import Loader from "../Loader";
import ProductItemsPerPage from "./ProductItemsPerPage";
import ProductList from "./ProductList";
import ProductPagination from "./ProductPagination";
import ProductPriceFilter from "./ProductPriceFilter";
import ProductSortOrder from "./ProductSortOrder";
import ProductsDisplayed from "./ProductsDisplayed";

const ProductPageServerSidePagination = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [products, setProducts] = useState([]);
	const [sort, setSort] = useState("name");
	const [order, setOrder] = useState("asc");
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(6);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [totalRecords, setTotalRecords] = useState(0);
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
				const result = await api.getProductsFilterSortPagination(
					sort,
					order,
					page,
					pageSize,
					priceRange,
				);
				if (!result.ok) {
					throw new Error("API Error");
				}
				const data = await result.json();
				if (!abortController.signal.aborted) {
					setProducts(data.products.data);
					setCurrentPage(data.products.currentPage);
					setTotalPages(data.products.totalPages);
					setTotalRecords(data.products.totalRecords);
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
	}, [sort, order, page, pageSize, priceRange]);

	const onSortChange = (e) => {
		setSort(e.target.value.toString());
	};

	const onOrderChange = (e) => {
		setOrder(e.target.value.toString());
	};

	const onPageChange = (page) => {
		setPage(Number(page));
	};

	const onPageSizeChange = (pageSize) => {
		setPageSize(Number(pageSize));
	};

	const onFilterChange = (price) => {
		setPage(Number(1));
		setPriceRange(price);
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
					<ProductItemsPerPage
						selectedValue={pageSize}
						onValueChange={onPageSizeChange}
						totalProducts={totalRecords}
					/>
					<ProductsDisplayed productCount={products?.length} />
					<ProductPagination
						totalPages={totalPages}
						currentPage={currentPage}
						onPageChange={onPageChange}
					/>
				</>
			)}
		</main>
	);
};

export default ProductPageServerSidePagination;
