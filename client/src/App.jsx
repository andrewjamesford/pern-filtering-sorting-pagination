import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import DashboardPage from "./components/dashboard/DashboardPage";
import ProductPage from "./components/products/ProductPage";
import NotFoundPage from "./components/NotFoundPage";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="">
      <Header />
      <Routes>
        <Route exact path="/dashboard" element={<DashboardPage />} />
        <Route exact path="/" element={<ProductPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
