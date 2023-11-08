import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { login_user, user } from "../../utils/constants";
import { toast } from "react-toastify";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || null,
    isLoggedIn: !!localStorage.getItem("token") || false,
    user: localStorage.getItem("user") || null,
  },
  reducers: {
    setToken: (state, action) => {
      localStorage.setItem("token", action.payload);
      state.token = action.payload;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setUser: (state, action) => {
      localStorage.setItem("user", action.payload);
      state.user = action.payload;
    },
  },
});

//login
export const login = createAsyncThunk(
  "auth/login",
  async (data, { dispatch }) => {
    try {
      const { username, password } = data;
      let user = "user";
      let isLoggedIn = false;
      let token = null;

      if (username === "admin" && password === "admin123") {
        user = "admin";
        isLoggedIn = true;
        token = "abcde468";
      }

      dispatch(setToken(token));
      dispatch(setUser(user));
      dispatch(setIsLoggedIn(isLoggedIn));

      if (user !== "admin") {
        const config = {
          method: "POST",
          url: `${login_user}`,
          headers: {
            "Content-Type": "application/json",
          },
          data: data,
        };
        const response = await axios.request(config);
        const { token } = response.data;

        dispatch(setToken(token));
        dispatch(setIsLoggedIn(true));
        dispatch(getUser(null, null, null));

        return response.data;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error("Login Failed! Please check your username or password");
        dispatch(setIsLoggedIn(false));
        return;
      }
    }
  }
);

//logout
export const logout = (navigate) => (dispatch) => {
  try {
    dispatch(setToken(null));
    dispatch(setIsLoggedIn(false));
    dispatch(setUser(null));

    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    if (navigate) navigate("/");
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

//getuser
export const getUser =
  (navigate, navigatePath, navigatePathError) => async (dispatch, getState) => {
    try {
      const { token } = getState().auth;

      if (!token) return;

      const response = await axios.get(`${user}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data;

      dispatch(setUser(data));

      if (navigatePath) navigate(navigatePath);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response.status === 401) {
          dispatch(setToken(null));
          dispatch(setIsLoggedIn(false));
          dispatch(setUser(null));

          if (navigatePathError) navigate(navigatePathError);
          return;
        }

        toast.error(error.response.data.message);
        return;
      }
      toast.error(error.response.data.message);
    }
  };

export const { setToken, setIsLoggedIn, setUser } = authSlice.actions;

export default authSlice.reducer;
