const ProductItemsPerPage = ({
	selectedValue = 5,
	onValueChange,
	totalProducts,
}) => {
	return (
		<div className="flex flex-col items-center px-4 md:px-10 max-w-md mx-auto">
			<div className="w-full border-b-2 border-black appearance-none bg-transparent py-2 grid grid-cols-2 mb-4">
				<label htmlFor="show" className="">
					Items per page:
				</label>
				<select
					name="show"
					id="show"
					value={selectedValue}
					onChange={(e) => onValueChange(e.target.value)}
					className="border-none justify-self-end"
				>
					<option value="6">6</option>
					<option value="12">12</option>
				</select>
			</div>
			<p className="text-sm">{totalProducts} Products Total</p>
		</div>
	);
};

export default ProductItemsPerPage;
