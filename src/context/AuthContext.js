import { useContext, createContext, useState } from "react";
import { useHistory } from "react-router-dom";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [userInfo, setUserInfo] = useState(null);
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
      .then((res) => {
        if (!res.ok) {
          console.error("login error:", res.status);
        }
        return res.json();
      })
      .then((data) => {
        setUserInfo(data.message.auth_token);
      })
      .catch((err) => {
        console.error("error logging in", err);
      });
  };

  const logout = () => {
    fetch(`http://localhost:8086/logout/${userInfo.user_id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        if (res.ok) {
          console.log("Successfully logged out");
        } else {
          console.error("Failed logging out");
        }
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };

  const signup = (userData) => {
    setUserInfo(userData);
    history.push("/login");
  };

  const values = { login, logout, signup, userInfo };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

export const useAuthInfo = () => {
  return useContext(AuthContext);
};
