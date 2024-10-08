/* eslint-disable react/prop-types */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import Cookie from "js-cookie";
import axios from "axios";
import { BASE_URL } from "../utils/helpers";
import { useNotification } from "../hooks/useNotification";

const AuthContext = createContext();

const initialState = {
  currentUserData: {},
  isLoggedIn: false,
  loading: false,
  error: false,
  errorMessage: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "isLoading":
      return { ...state, loading: true };

    case "notLoading":
      return { ...state, loading: false };

    case "loggedIn":
      return {
        ...state,
        isLoggedIn: true,
      };

    case "currentUserData": {
      return { ...state, currentUserData: action.payload };
    }

    case "logout": {
      return { ...state, isLoggedIn: false, currentUserData: null };
    }

    case "update": {
      return { ...state, currentUserData: action.payload };
    }
    case "error":
      return { ...state, error: true, errorMessage: action.payload };
    default:
      throw new Error("Unknown action type");
  }
};

function AuthProvider({ children }) {
  const [{ currentUserData, isLoggedIn, loading, error }, dispatch] =
    useReducer(reducer, initialState);
  const token = Cookie.get("token");

  const changeCursorStyle = useCallback(() => {
    if (loading) {
      document.body.style.cursor = "progress";
    } else {
      document.body.style.cursor = "default";
    }
  }, [loading]);

  useEffect(() => {
    changeCursorStyle();
  }, [changeCursorStyle]);

  // SIGNUP

  const signup = async (payload) => {
    try {
      dispatch({
        type: "isLoading",
      });

      const res = await axios.post(`${BASE_URL}/users/signup`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return res.data;
    } catch (err) {
      return err.response.data || "An error occurred while sing up";
    } finally {
      dispatch({
        type: "notLoading",
      });
    }
  };

  // LOGIN
  const login = async (value) => {
    try {
      dispatch({
        type: "isLoading",
      });
      const res = await fetch(`${BASE_URL}/users/login`, {
        method: "POST",
        body: JSON.stringify(value),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (data.status === "success") {
        Cookie.set("token", data.token, { expires: 10 });
        dispatch({
          type: "loggedIn",
        });
        dispatch({
          type: "currentUserData",
          payload: data.data,
        });
      }

      return data;
    } catch (err) {
      return err;
    } finally {
      dispatch({
        type: "notLoading",
      });
    }
  };

  // VERIFY ACCOUNT
  const verifyAccount = async (key, payload) => {
    try {
      dispatch({
        type: "isLoading",
      });
      const res = await fetch(`${BASE_URL}/users/verifyEmail/${key}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (data.status === "success") {
        Cookie.set("token", data.token, { expires: 10 });
        dispatch({
          type: "loggedIn",
        });
        dispatch({
          type: "currentUserData",
          payload: data.data,
        });
      }
      return data.status;
    } catch (err) {
      return err;
    } finally {
      dispatch({
        type: "notLoading",
      });
    }
  };

  const { notify } = useNotification();

  const getMe = useCallback(async () => {
    try {
      const token = Cookie.get("token");

      if (token) {
        dispatch({
          type: "isLoading",
        });

        const res = await fetch(`${BASE_URL}/users/me`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (data.status === "success") {
          dispatch({
            type: "currentUserData",
            payload: data.data.doc,
          });
        } else {
          notify("error", data.message);
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      dispatch({
        type: "notLoading",
      });
    }
  }, []);

  useEffect(() => {
    getMe();
  }, [getMe]);

  const logout = () => {
    Cookie.remove("token");

    dispatch({
      type: "logout",
    });
  };

  const forgetPassword = async (payload) => {
    try {
      dispatch({
        type: "isLoading",
      });
      const res = await axios.post(
        `${BASE_URL}/users/forgetPassword`,
        { email: payload },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return res.data;
    } catch (err) {
      return err.response.data || "Something went wrong!";
    } finally {
      dispatch({
        type: "notLoading",
      });
    }
  };

  const updateMe = async (payload) => {
    try {
      const token = Cookie.get("token");
      dispatch({
        type: "isLoading",
      });
      const res = await axios.patch(`${BASE_URL}/users/updateMe`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 200) {
        dispatch({
          type: "update",
          payload: res.data.data.user,
        });
      }

      return res.data;
    } catch (err) {
      return err.response.data || "Something went wrong!";
    } finally {
      dispatch({
        type: "notLoading",
      });
    }
  };

  const updateMyPassword = async (payload) => {
    try {
      const token = Cookie.get("token");
      dispatch({
        type: "isLoading",
      });
      const res = await axios.patch(
        `${BASE_URL}/users/updateMyPassword`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return res;
    } catch (err) {
      return err.response.data || "Something went wrong!";
    } finally {
      dispatch({
        type: "notLoading",
      });
    }
  };

  const recoverPassword = async (newPassword, key) => {
    try {
      dispatch({
        type: "isLoading",
      });
      const res = await axios.post(
        `${BASE_URL}/users/resetPassword/${key}`,
        { password: newPassword },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return res.data;
    } catch (err) {
      return err.response.data || "Something went wrong!";
    } finally {
      dispatch({
        type: "notLoading",
      });
    }
  };

  const deleteMe = async () => {
    try {
      const token = Cookie.get("token");
      dispatch({
        type: "isLoading",
      });
      const res = await axios.delete(`${BASE_URL}/users/deleteMe`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (res.status === 204) {
        Cookie.remove("token");
      }

      return res;
    } catch (err) {
      return err.response.data || "Something went wrong";
    } finally {
      dispatch({
        type: "notLoading",
      });
    }
  };

  useEffect(
    function () {
      if (token) {
        dispatch({
          type: "loggedIn",
        });
      }
    },
    [token]
  );

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        loading,
        currentUserData,
        error,
        signup,
        login,
        logout,
        verifyAccount,
        getMe,
        forgetPassword,
        updateMe,
        updateMyPassword,
        recoverPassword,
        deleteMe,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

const useAuthentication = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("AuthContext used outside the AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuthentication };
