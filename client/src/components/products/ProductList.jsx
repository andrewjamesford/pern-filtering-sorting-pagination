import Product from "./Product";

const ProductList = ({ products }) => {
	console.log("ProductList -> products", products);

	return (
		<div className="flex items-center">
			<ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
