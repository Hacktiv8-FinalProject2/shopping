import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../store/reducers/auth";
import { toast } from "react-toastify";

function Protected({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!token) {
      toast.warn(`Please Login Now!`);
      return navigate("/login");
    }

    dispatch(getUser(navigate, null, "/"));
  }, [navigate, dispatch, token]);

  return children;
}

export default Protected;
