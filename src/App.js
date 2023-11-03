import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NoNavbar from "./components/NoNavbar";
import NoTokenAccess from "./components/NoTokenAccess";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Cart from "./pages/Cart";
import Protected from "./components/Protected";

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
      </Routes>
      {showFooter && <Footer />}
      <ToastContainer theme="colored" />
    </div>
  );
}

export default App;
