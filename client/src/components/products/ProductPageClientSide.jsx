import { useEffect, useState } from "react";
import api from "../../api";
import ProductList from "./ProductList";
import ProductSortOrder from "./ProductSortOrder";
import Loader from "../Loader";
import ErrorMessage from "../ErrorMessage";
import ProductSearch from "./ProductSearch";

const ProductPageClientSide = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState("id");
  const [order, setOrder] = useState("asc");

  useEffect(() => {
    // We use AbortController (https://developer.mozilla.org/en-US/docs/Web/API/AbortController)
    // to clean up so that we don’t introduce a memory leak
    // (https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup)
    const abortController = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(false);
        const result = await api.getProductsClientSide();
        if (!result.ok) {
          throw new Error("API Error");
        }
        const data = await result.json();
        console.log(data);
        if (!abortController.signal.aborted) {
          setProducts(data.products);
        }
      } catch (error) {
        if (!abortController.signal.aborted) {
          setError(true);
        }
      } finally {
        if (!abortController.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => abortController.abort();
  }, [sort, order]);

  const onSortChange = (e) => {
    setSort(e.target.value + "");
  };

  const onOrderChange = (e) => {
    setOrder(e.target.value + "");
  };

  return (
    <main className="">
      <ProductSearch />
      <ProductSortOrder
        onSortChange={onSortChange}
        onOrderChange={onOrderChange}
      />
      {error && <ErrorMessage message="Error fetching products" />}
      {loading && <Loader />}
      <ProductList products={products} className="" />
    </main>
  );
};

export default ProductPageClientSide;
