import Product from "./Product";

const ProductList = ({ products, className }) => {
	console.log("ProductList", products);
	return (
		<ul className={className}>
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
	);
};

export default ProductList;
