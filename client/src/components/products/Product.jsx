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
	return (
		<li className="">
			<div className="">
				{imageName ? (
					<img
						src={`./img/products/${imageName}.png`}
						alt={imageDescription}
						className=""
					/>
				) : (
					<img src="./img/products/default.png" alt="Default" className="" />
				)}
				{discountValue && discountType && (
					<DiscountBadge
						className="badge"
						discountValue={discountValue}
						discountType={discountType}
					/>
				)}
				<h3 className="text-lg h-2 uppercase font-bold">{name}</h3>
				<div className="py-4 prose">
					<p className="">{description}</p>
					<p className="space-y-2 proportional-nums text-sm">${price}</p>
				</div>
			</div>
		</li>
	);
};

export default Product;
