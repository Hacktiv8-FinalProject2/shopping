import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NoNavbar from "./components/NoNavbar";
import DetailProduct from "./pages/DetailProduct";
import Product from "./components/home/Product";
import NoTokenAccess from "./components/NoTokenAccess";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Protected from "./components/Protected";
import Cart from "./pages/Cart";
import Report from "./pages/admin/Report";

function App() {
  const location = useLocation();
  const showFooter = location.pathname !== "/login";

  return (
    <div className="app">
      <NoNavbar>
        <Navbar />
      </NoNavbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<DetailProduct />} />
        <Route path="/products" element={<Product />} />
        <Route
          path="/login"
          element={
            <NoTokenAccess>
              <Login />
            </NoTokenAccess>
          }
        />
        <Route
          path="/cart"
          element={
            <Protected>
              <Cart />
            </Protected>
          }
        />
        <Route
          path="/report"
          element={
            <Protected>
              <Report />
            </Protected>
          }
        />
      </Routes>
      {showFooter && <Footer />}
      <ToastContainer theme="colored" />
    </div>
  );
}

export default App;
