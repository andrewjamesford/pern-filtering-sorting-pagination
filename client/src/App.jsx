import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import NotFoundPage from "./components/NotFoundPage";
import ProductPageClientSide from "./components/products/ProductPageClientSide";
import ProductPageServerSide from "./components/products/ProductPageServerSide";
import ProductPageServerSidePagination from "./components/products/ProductPageServerSidePagination";

const App = () => {
	return (
		<div className="">
			<Header />
			<Routes>
				<Route exact path="/" element={<ProductPageClientSide />} />
				<Route exact path="/pants" element={<ProductPageServerSide />} />
				<Route
					exact
					path="/tshirts"
					element={<ProductPageServerSidePagination />}
				/>
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
			<Footer />
		</div>
	);
};

export default App;
