import { useState } from "react";
import { useAuthInfo } from "../../../context/AuthContext";
import { useHistory } from "react-router-dom";

export default function LoginPage() {
  const { login } = useAuthInfo();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const loginForm = (e) => {
    e.preventDefault();
    login(email, password);
    setEmail("");
    setPassword("");
    history.push("/home");
  };

  return (
    <div className="login-page-container">
      <form onSubmit={loginForm}>
        <input
          type="text"
          value={email}
          placeholder="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          value={password}
          placeholder="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
