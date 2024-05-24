import Product from "./Product";

const ProductList = ({ products }) => {
  return (
    <div className="flex justify-center items-center w-full">
      <ul className="md:max-w-md lg:max-w-lg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products &&
          products.length > 0 &&
          products.map((product) => (
            <Product
              key={product.id}
              name={product.name}
              description={product.description}
              price={product.price}
              imageName={product.imageName}
              imageDescription={product.imageDescription}
              discountValue={product.discountValue}
              discountType={product.discountType}
            />
          ))}
      </ul>
    </div>
  );
};

export default ProductList;
