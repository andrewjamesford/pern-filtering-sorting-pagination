const DiscountBadge = ({ discountType, discountValue }) => {
	return (
		<div className="">
			{discountType === "percentage off" && <>{discountValue} % off</>}
			{discountType === "fixed amount off" && <>$ {discountValue} off</>}
		</div>
	);
};

export default DiscountBadge;
