import { useContext, createContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [userInfo, setUserInfo] = useState({});
  const history = useHistory();

  const login = (email, password) => {
    const body = { email: email, password: password };
    fetch("http://localhost:8086/auth", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
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
