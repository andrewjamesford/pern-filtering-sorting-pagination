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
    <li className="product">
      <div className="card">
        <div>
          {imageName ? (
            <img
              src={`./img/${imageName}`}
              alt={imageDescription}
              className="product-image"
            />
          ) : (
            <img
              src="./img/dog-photo-default.png"
              alt="Default product dog"
              className="product-image"
            />
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
        <p data-testid="product-description" className="product-description">
          {description}
        </p>
        <button className="button">Add to Cart</button>
      </div>
    </li>
  );
};

export default Product;
