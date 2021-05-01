import React, { useState } from "react";
import "../styles/Signin.css";
import { BrowserRouter as Router, Link, useHistory } from "react-router-dom";
import Header from "./Header.js";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const failedLogin = () => toast.error(`Email or Password incorrect!`);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //if (!email || !password) return;

    const resp = await axios.get(
      `http://localhost:3000/users?email=${email}&&password=${password}`
    );

    const { data } = resp;

    console.log(resp);

    if (data.length) {
      localStorage.setItem("user", JSON.stringify({ email, password }));
      //route to payment page
      return history.push("/pay");
    } else {
      failedLogin();
    }

    setEmail("");
    setPassword("");
  };

  return (
    <main>
      <Header />
      <ToastContainer />
      <h2 className="heading">Sign In to Your Account</h2>

      <form id="signInForm" onSubmit={handleSubmit}>
        <label className="block left">Email Address</label>
        <input
          id="emailField"
          className="block"
          type="text"
          name="email"
          placeholder="Email Address"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label class="block left">Password</label>
        <input
          id="passField"
          className="block"
          type="password"
          name="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input id="submit" className="block" type="submit" value="Sign In" />
      </form>
      <p>
        Don't have an account?{" "}
        <Router>
          <Link className="sign-link" to="/">
            Sign Up
          </Link>
        </Router>
      </p>
      <Router>
        <Link className="forgot" to="/">
          Forgot password?
        </Link>
      </Router>
    </main>
  );
}

export default Signin;
