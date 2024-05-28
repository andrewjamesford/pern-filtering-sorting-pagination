const ProductShow = ({ selectedValue = 5, onValueChange, totalProducts }) => {
	return (
		<div className="flex flex-col items-center px-10 max-w-md mx-auto">
			<div className="w-full border-b-2 border-black appearance-none bg-transparent py-2 grid grid-cols-2 mb-4">
				<label htmlFor="show" className="">
					Show:
				</label>
				<select
					name="show"
					id="show"
					value={selectedValue}
					onChange={(e) => onValueChange(e.target.value)}
					className="border-none justify-self-end"
				>
					<option value="5">5</option>
					<option value="10">10</option>
				</select>
			</div>
			{totalProducts} Products Total
		</div>
	);
};

export default ProductShow;
