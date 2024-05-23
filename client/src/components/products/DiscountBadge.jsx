const DiscountBadge = ({ discountType, discountValue, className }) => {
  return (
    <div
      className={`${className || ""} discountBadge`}
      data-testid="badge"
    >
      {discountType === "percentage off" && <>{discountValue} % off</>}
      {discountType === "fixed amount off" && <>$ {discountValue} off</>}
    </div>
  );
};

export default DiscountBadge;
