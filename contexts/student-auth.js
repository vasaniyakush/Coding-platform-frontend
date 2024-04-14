import React, { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";
// import Router, { useRouter } from "next/router";

import api from "@/api";
import LoginForm from "@/components/studentLoginForm";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openTab, setOpenTab] = useState("none");

  useEffect(() => {
    async function loadUserFromCookies() {
      const token = Cookies.get("token");
      if (token) {
        try {
          console.log("check token", token);
          console.log("Got a token in the cookies, let's see if it is valid");
          api.defaults.headers.Authorization = `Bearer ${token}`;
          //   const user = await api.get("validate/admin");
          const { data: user } = await api.get("validate/user");
          console.log("got user", user);
          setUser(user);
        } catch (err) {
          setUser(null);
        }
      }
      setLoading(false);
    }

    loadUserFromCookies();
  }, []);

  const login = async (email, password, testId) => {
    try {
      const response = await api.post("user/login", {
        email,
        password,
        testId: parseInt(testId),
      });

      if (response && response.data && response.data.token) {
        const token = response.data.token;
        console.log("Got token", token);
        Cookies.set("token", token, { expires: 60 });
        api.defaults.headers.Authorization = `Bearer ${token}`;
        const { data: user } = await api.get("validate/user");
        // const user = await api.get("validate/admin");
        setUser(user);
        console.log("Got user", user);
        return true;
      } else {
        console.log("Login failed. No token found in response.");
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };
  const signUp = async (name, email, password, testId) => {
    try {
      const response = await api.post("user/signup", {
        name,
        email,
        password,
        testId: parseInt(testId),
      });

      if (response && response.data && response.data.token) {
        const token = response.data.token;
        console.log("Got token", token);
        Cookies.set("token", token, { expires: 60 });
        api.defaults.headers.Authorization = `Bearer ${token}`;
        const { data: user } = await api.get("validate/user");
        // const user = await api.get("validate/admin");
        setUser(user);
        console.log("Got user", user);
        return true;
      } else {
        console.log("Login failed. No token found in response.");
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    delete api.defaults.headers.Authorization;
    // window.location.pathname = '/login'
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        login,
        signUp,
        loading,
        logout,
        openTab,
        setOpenTab,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const ProtectRoute = ({ children, params }) => {
  const { isAuthenticated, isLoading } = useStudentAuth();
  console.log("CHECK", isAuthenticated);
  if (
    isLoading ||
    (!isAuthenticated && window.location.pathname !== "/login")
  ) {
    return <LoginForm params={params} />;
  }
  return children;
};
export const useStudentAuth = () => useContext(AuthContext);
