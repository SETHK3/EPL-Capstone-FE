import { useState } from "react";
import { useAuthInfo } from "../../../context/AuthContext";

export default function LoginPage() {
  const { login } = useAuthInfo();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginForm = () => {
    login(email, password);
    setEmail("");
    setPassword("");
  };

  return (
    <div className="login-page-container">
      <form onSubmit={loginForm()}>
        <input
          type="text"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
