const ProductsDisplayed = ({ productCount = 0 }) => {
	return (
		<div className="flex justify-center">
			<p className="text-sm">{productCount} Products Displayed</p>
		</div>
	);
};

export default ProductsDisplayed;
