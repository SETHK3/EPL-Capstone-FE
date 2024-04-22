import { useState } from "react";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:8086/signup", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "user created") {
          toast.success("Sign Up Successful!");
          history.push("/login");
        } else {
          toast.error("Please fill in all empty fields");
        }
      })
      .catch((err) => {
        console.error("error", err);
        toast.error("An error occurred. Please try again later.");
      });
  };

  return (
    <div className="signup-page-container">
      <div>
        <h1>Create an Account</h1>
      </div>
      <div>
        <form
          className="signup-form"
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            value={firstName}
            placeholder="First Name"
            className="input-field"
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            type="text"
            value={lastName}
            placeholder="Last Name"
            className="input-field"
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <input
            type="email"
            value={email}
            placeholder="Email"
            className="input-field"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            value={password}
            placeholder="Password"
            className="input-field"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="signup-button" type="submit">
            Sign Up
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
