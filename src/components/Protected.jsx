import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function Protected({ children }) {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!token) {
      toast.warn(`Please Login Now!`);
      return navigate("/login");
    }
  }, [navigate, token]);

  return children;
}

export default Protected;
