import { useEffect, useState } from "react";
import { useAuthInfo } from "../../../context/AuthContext";
import { useHistory } from "react-router-dom";

export default function LoginPage() {
  const { login, userInfo } = useAuthInfo();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const loginForm = (e) => {
    e.preventDefault();
    login(email, password);
    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    if (userInfo) {
      history.push("/home");
    }
  }, [userInfo, history]);

  return (
    <div className="login-page-container">
      <form className="login-form" onSubmit={loginForm}>
        <input
          type="text"
          value={email}
          placeholder="email"
          className="input-field"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          value={password}
          placeholder="password"
          className="input-field"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button className="login-button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
