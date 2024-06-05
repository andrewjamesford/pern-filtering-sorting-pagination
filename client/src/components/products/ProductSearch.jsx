import { useState } from "react";
const ProductSearch = ({ search = "", handleSearch }) => {
	// Using useState hook to manage the state of productSearch
	const [productSearch, setProductSearch] = useState(search);

	// Defining a function to handle the search button click
	const onSearchButtonClick = () => {
		// Calling the handleSearch function passed as a prop with the current productSearch state
		handleSearch(productSearch);
	};
	return (
		<div className="w-full bg-black flex justify-center p-4 my">
			<input
				type="search"
				value={productSearch}
				onChange={(e) => {
					// On change of input, update the productSearch state
					setProductSearch(e.target.value);
				}}
				onBlur={(e) => {
					if (e.target.value.toString() === "") {
						// On leave of focus check if search is empty to
						// handle default search type "X" button
						handleSearch("");
					}
				}}
				minLength={2}
				required
				placeholder="Search products..."
				className="w-full max-w-md rounded-full py-2 px-4 bg-white"
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						onSearchButtonClick();
					}
				}}
			/>
			<button
				className="ml-2 bg-white p-2 rounded-full block w-10 h-10"
				onClick={onSearchButtonClick}
				type="submit"
			>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
					<title>Search</title>
					{/* <!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
					<path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
				</svg>
			</button>
		</div>
	);
};

export default ProductSearch;
