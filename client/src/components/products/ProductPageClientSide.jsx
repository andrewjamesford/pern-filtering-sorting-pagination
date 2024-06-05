import { useCallback, useState } from "react";
import origData from "../../data/products.json";
import ProductList from "./ProductList";
import ProductPriceFilter from "./ProductPriceFilter";
import ProductSortOrder from "./ProductSortOrder";
import ProductsDisplayed from "./ProductsDisplayed";

const ProductPageClientSide = () => {
  const [sort, setSort] = useState("name");
  const [order, setOrder] = useState("asc");
  const [priceRange, setPriceRange] = useState(100);
  const [products, setProducts] = useState(origData.products);

  const filterProductsByPrice = useCallback(
    (products, price) => {
      const parsedPrice = Number.parseFloat(price);
      return products.filter((product) => {
        const productPrice = Number.parseFloat(product.price.replace("$", ""));
        return productPrice <= parsedPrice;
      });
    },
    [products, price]
  );

  const sortProducts = useCallback(
    (products, sortVal, orderVal) => {
      return [...products].sort((a, b) => {
        const compareVal =
          typeof a[sortVal] === "number" && typeof b[sortVal] === "number"
            ? a[sortVal] - b[sortVal]
            : a[sortVal].localeCompare(b[sortVal]);

        return orderVal.toLowerCase() === "desc" ? -compareVal : compareVal;
      });
    },
    [products, sortVal, orderVal]
  );

  const sortOrder = useCallback(
    (dataVal, sortVal, orderVal, priceRange) => {
      if (!dataVal || dataVal.length < 1) {
        return dataVal;
      }

      const filteredProducts = filterProductsByPrice(dataVal, priceRange);
      return sortProducts(filteredProducts, sortVal, orderVal);
    },
    [filterProductsByPrice, sortProducts]
  );

  const onFilterChange = (price) => {
    const parsedPrice = Number.parseFloat(price);
    setPriceRange(parsedPrice);
    const filteredProducts = filterProductsByPrice(
      origData.products,
      parsedPrice
    );
    setProducts(sortOrder(filteredProducts, sort, order, parsedPrice));
  };

  const onSortChange = (e) => {
    const sortVal = e.target.value.toString();
    setSort(sortVal);
    setProducts(sortOrder(products, sortVal, order, priceRange));
  };

  const onOrderChange = (e) => {
    const orderVal = e.target.value.toString();
    setOrder(orderVal);
    setProducts(sortOrder(products, sort, orderVal, priceRange));
  };

  return (
    <main className="flex flex-col">
      <ProductPriceFilter onRangeChange={onFilterChange} price={priceRange} />
      <ProductSortOrder
        onSortChange={onSortChange}
        onOrderChange={onOrderChange}
      />
      {products && (
        <>
          <ProductList products={products} />
          <ProductsDisplayed productCount={products?.length} />
        </>
      )}
    </main>
  );
};

export default ProductPageClientSide;
