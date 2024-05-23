const ProductSortOrder = ({ onSortChange, onOrderChange }) => {
	return (
		<div className="flex w-full py-4">
			<div className="w-1/2 flex items-center justify-center">
				<div className=" border-b-2 border-black appearance-none bg-transparent py-2">
					<label htmlFor="productSort" className="mr-2">
						Sort:
					</label>
					<select
						id="productSort"
						name="productSort"
						className="border-none"
						onChange={onSortChange}
					>
						<option value="name">Name</option>
						<option value="description">Description</option>
						<option value="price">Price</option>
						<option value="discountAmount">Discount Amount</option>
					</select>
				</div>
			</div>
			<div className="w-1/2 flex items-center justify-center">
				<div className=" border-b-2 border-black appearance-none bg-transparent py-2">
					<label htmlFor="productOrder" className="mr-2">
						Order:
					</label>
					<select
						id="productOrder"
						name="productOrder"
						className="border-none"
						onChange={onOrderChange}
					>
						<option value="ASC">Ascending</option>
						<option value="DESC">Descending</option>
					</select>
				</div>
			</div>
		</div>
	);
};

export default ProductSortOrder;
