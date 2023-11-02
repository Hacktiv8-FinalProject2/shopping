import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUser } from "../store/reducers/auth";

function NoTokenAccess({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser(navigate, "/", null));
  }, [navigate, dispatch]);

  return children;
}

export default NoTokenAccess;
