const ProductSortOrder = ({ onSortChange, onOrderChange }) => {
	return (
		<div className="flex flex-col items-center">
			<div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-5xl py-10 md:py-5 items-center gap-4 px-4 lg:px-0">
				<div className="w-full border-b-2 border-black appearance-none bg-transparent py-2 grid grid-cols-2 mb-4">
					<label htmlFor="productSort">Sort:</label>
					<select
						id="productSort"
						name="productSort"
						className="border-none justify-self-end"
						onChange={onSortChange}
						defaultValue={"name"}
					>
						<option value="name">Name</option>
						<option value="description">Description</option>
						<option value="price">Price</option>
					</select>
				</div>
				<div className="w-full border-b-2 border-black appearance-none bg-transparent py-2 grid grid-cols-2 mb-4">
					<label htmlFor="productOrder">Order:</label>
					<select
						id="productOrder"
						name="productOrder"
						className="border-none justify-self-end"
						onChange={onOrderChange}
						defaultValue={"asc"}
					>
						<option value="asc">Ascending</option>
						<option value="desc">Descending</option>
					</select>
				</div>
			</div>
		</div>
	);
};

export default ProductSortOrder;
