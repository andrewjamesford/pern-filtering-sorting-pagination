import { useEffect, useState } from "react";
import origData from "../../data/products.json";
import ProductList from "./ProductList";
import ProductPriceFilter from "./ProductPriceFilter";
import ProductSortOrder from "./ProductSortOrder";
import ProductsDisplayed from "./ProductsDisplayed";

function ProductPageClientSide() {
  const [sort, setSort] = useState("name");
  const [order, setOrder] = useState("asc");
  const [priceRange, setPriceRange] = useState(100);
  const [products, setProducts] = useState(origData.products);

  const filterProductsByPrice = (products, price) => {
    const parsedPrice = Number.parseFloat(price);

    const filteredProducts = products.filter((product) => {
      const productPrice = Number.parseFloat(product.price.replace("$", ""));
      return productPrice <= parsedPrice;
    });
    return filteredProducts;
  };

  const sortProducts = (products, sortVal, orderVal) => {
    return [...products].sort((a, b) => {
      const compareVal =
        typeof a[sortVal] === "number" && typeof b[sortVal] === "number"
          ? a[sortVal] - b[sortVal]
          : a[sortVal].localeCompare(b[sortVal]);

      return orderVal.toLowerCase() === "desc" ? -compareVal : compareVal;
    });
  };

  useEffect(() => {
    const initalProductsSortedAndFiltered = () => {
      setProducts(
        sortProducts(filterProductsByPrice(products, priceRange), sort, order)
      );
    };

    initalProductsSortedAndFiltered();
  }, [priceRange, sort, order]);

  const onFilterChange = (price) => {
    const parsedPrice = Number.parseFloat(price);
    setPriceRange(parsedPrice);
    setProducts(origData.products);
  };

  const onSortChange = (e) => {
    const sortVal = e.target.value.toString();
    setSort(sortVal);
  };

  const onOrderChange = (e) => {
    const orderVal = e.target.value.toString();
    setOrder(orderVal);
  };

  return (
    <main className="flex flex-col">
      <ProductPriceFilter onRangeChange={onFilterChange} price={priceRange} />
      <ProductSortOrder
        onSortChange={onSortChange}
        onOrderChange={onOrderChange}
      />
      {products && products.length > 0 && (
        <>
          <ProductList products={products} />
          <ProductsDisplayed productCount={products?.length} />
        </>
      )}
    </main>
  );
}

export default ProductPageClientSide;
