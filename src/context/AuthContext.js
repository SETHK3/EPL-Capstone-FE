import { useContext, createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [userInfo, setUserInfo] = useState(null);

  const login = (email, password) => {
    const body = { email: email, password: password };
    fetch("http://localhost:8086/auth", body)
      .then((res) => res.json())
      .then((data) => {
        setUserInfo(data.result);
      })
      .catch((err) => {
        console.error("error logging in", err);
      });
  };

  const values = { login, userInfo };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

export const useAuthInfo = () => {
  return useContext(AuthContext);
};
