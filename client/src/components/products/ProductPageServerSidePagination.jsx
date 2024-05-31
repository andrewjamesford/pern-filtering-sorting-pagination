import { useEffect, useState } from "react";
import api from "../../api";
import ProductList from "./ProductList";
import ProductSortOrder from "./ProductSortOrder";
import Loader from "../Loader";
import ErrorMessage from "../ErrorMessage";
import ProductSearch from "./ProductSearch";
import ProductPagination from "./ProductPagination";
import ProductItemsPerPage from "./ProductItemsPerPage";

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
				const result = await api.getProductsServerSidePagination(
					sort,
					order,
					page,
					pageSize,
					search,
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
	}, [sort, order, page, pageSize, search]);

	const onSortChange = (e) => {
		setSort(e.target.value + "");
	};

	const onOrderChange = (e) => {
		setOrder(e.target.value + "");
	};

	const onPageChange = (page) => {
		setPage(Number(page));
	};

	const onPageSizeChange = (e) => {
		setPageSize(Number(e));
	};

	const onSearchChange = (searchInput) => {
		setSearch(searchInput);
	};

	return (
		<main className="flex flex-col">
			<ProductSearch handleSearch={onSearchChange} />
			<ProductSortOrder
				onSortChange={onSortChange}
				onOrderChange={onOrderChange}
			/>
			{error && <ErrorMessage message="Error fetching products" />}
			{loading ? (
				<Loader />
			) : (
				<div>
					<ProductList products={products} />
					<ProductItemsPerPage
						selectedValue={pageSize}
						onValueChange={onPageSizeChange}
						totalProducts={totalRecords}
					/>
					<ProductPagination
						totalPages={totalPages}
						currentPage={currentPage}
						onPageChange={onPageChange}
					/>
				</div>
			)}
		</main>
	);
};

export default ProductPageServerSidePagination;
