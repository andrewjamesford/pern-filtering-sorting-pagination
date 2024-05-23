import DiscountBadge from "./DiscountBadge";

const Product = ({
	name,
	description,
	price,
	imageName,
	imageDescription,
	discountType,
	discountValue,
}) => {
	console.log("Product", name);
	return (
		<li className="">
			<div className="">
				<div>
					{imageName ? (
						<img
							src={`./img/${imageName}`}
							alt={imageDescription}
							className=""
						/>
					) : (
						<img src="./img/dog-photo-default.png" alt="Default" className="" />
					)}
					{discountValue && discountType && (
						<DiscountBadge
							className="badge"
							discountValue={discountValue}
							discountType={discountType}
						/>
					)}
				</div>
				<h3>{name}</h3>
				<p>Price {price}</p>
				<p className="">{description}</p>
				<button className="">Add to Cart</button>
			</div>
		</li>
	);
};

export default Product;
