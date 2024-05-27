import Product from "./Product";

const ProductList = ({ products }) => {
	return (
		<div className="flex flex-col items-center w-full px-4">
			<ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full max-w-5xl gap-4">
				{products &&
					products.length > 0 &&
					products.map((product) => (
						<Product
							key={product.id}
							name={product.name}
							description={product.description}
							price={product.price}
							imageName={product.imageName}
						/>
					))}
			</ul>
		</div>
	);
};

export default ProductList;
