import { useEffect, useState } from "react";
import api from "../../api";
import Loader from "../Loader";
import ErrorMessage from "../ErrorMessage";
import CategoriesReport from "./CategoriesReport";
import DiscountsReport from "./DiscountReport";

const DashboardPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [categoryReports, setCategoryReport] = useState([]);
  const [discountReports, setDiscountReport] = useState([]);
  const [product, setProduct] = useState("");

  useEffect(() => {
    // We use AbortController (https://developer.mozilla.org/en-US/docs/Web/API/AbortController)
    // to clean up so that we don’t introduce a memory leak
    // (https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup)
    const abortController = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(false);
        setErrorMessage("");
        const result = await api.getReports();
        if (!result.ok) {
          const error = await result.json();
          throw new Error(error.message || "Error fetching reports");
        }
        const data = await result.json();
        if (!abortController.signal.aborted) {
          setCategoryReport(data.categoryReport);
          setDiscountReport(data.discountReport);
        }
      } catch (error) {
        if (!abortController.signal.aborted) {
          setError(true);
          setErrorMessage(error.message);
        }
      } finally {
        if (!abortController.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => abortController.abort();
  }, []);

  return (
    <main className="narrow-layout main-content section-padding page-padding">
      <div>
        <h2>Dashboard</h2>
        {loading && <Loader />}
        {error && <ErrorMessage message={errorMessage} />}
        {categoryReports.length > 0 && (
          <CategoriesReport
            reportData={categoryReports}
            className="half-width section-padding"
          />
        )}
        {discountReports.length > 0 && (
          <DiscountsReport
            reportData={discountReports}
            className="half-width section-padding"
          />
        )}
      </div>
    </main>
  );
};

export default DashboardPage;
