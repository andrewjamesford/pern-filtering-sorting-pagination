const Product = ({ name, description, price = 0, imageName }) => {
	return (
		<li>
			<div className="flex flex-col">
				{imageName ? (
					<img
						src={`./img/products/${imageName}`}
						alt={description}
						className="rounded-md"
					/>
				) : (
					<img
						src="./img/products/default.png"
						alt="Default"
						className="rounded-md"
					/>
				)}
				<h3 className="text-lg pt-2 uppercase font-bold overflow-hidden overflow-ellipsis whitespace-nowrap">
					{name}
				</h3>
				<div className="prose pb-2">
					<p className="">{description}</p>
					<p className="space-y-2 proportional-nums text-sm">{price}</p>
				</div>
			</div>
		</li>
	);
};

export default Product;
