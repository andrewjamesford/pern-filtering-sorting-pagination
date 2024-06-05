import { useState } from "react";

const ProductPriceFilter = ({ onRangeChange, price }) => {
	const [selectedValue, setSelectedValue] = useState(price);

	return (
		<div className="w-full bg-black flex justify-center p-4 my">
			<div className="flex flex-col min-w-64">
				<label htmlFor="priceRange" className="text-white w-full text-center">
					Under ${selectedValue}
				</label>
				<input
					type="range"
					id="priceRange"
					name="priceRange"
					min="20"
					max="100"
					step={20}
					list="values"
					value={selectedValue}
					className="text-white w-full max-w-md bg-white cursor-pointer accent-white"
					onChange={(e) => {
						setSelectedValue(e.target.value);
						onRangeChange(e.target.value);
					}}
				/>

				<datalist
					id="values"
					className="w-full flex white-text justify-between text-white text-sm"
				>
					<option value="20" label="20" />
					<option value="40" label="40" />
					<option value="60" label="60" />
					<option value="80" label="80" />
					<option value="100" label="100" />
				</datalist>
			</div>
		</div>
	);
};

export default ProductPriceFilter;
