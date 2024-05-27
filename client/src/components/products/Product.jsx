const Product = ({ name, description, price = 0, imageName }) => {
	// Set to NZD currency
	const formattedPrice = new Intl.NumberFormat("en-NZ", {
		style: "currency",
		currency: "NZD",
	}).format(isNaN(price) ? 0 : price);
	return (
		<li>
			<div>
				{imageName ? (
					<img
						src={`./img/products/${imageName}.png`}
						alt={description}
						className="rounded-md"
					/>
				) : (
					<img src="./img/products/default.png" alt="Default" className="" />
				)}
				<h3 className="text-lg h-2 uppercase font-bold">{name}</h3>
				<div className="py-4 prose">
					<p className="">{description}</p>
					<p className="space-y-2 proportional-nums text-sm">
						{formattedPrice}
					</p>
				</div>
			</div>
		</li>
	);
};

export default Product;
