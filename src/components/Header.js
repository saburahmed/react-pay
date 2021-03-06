import React from "react";
import "../styles/Header.css";
import { BrowserRouter as Router, Link, useHistory } from "react-router-dom";

function Header({ user }) {
  const history = useHistory();

  const handleSignOut = () => {
    localStorage.removeItem("user");

    return history.push("/");
  };

  const handleHistory = () => {
    return history.push("/notFound");
  };

  return (
    <nav className="navbar">
      <Router>
        <Link to="/" className="brand">
          <h1>ReactPay</h1>
        </Link>
      </Router>
      <ul>
        {!user && (
          <>
            <li>
              <Router>
                <Link to="/">How it works</Link>
              </Router>
            </li>
            <li>
              <Router>
                <Link to="/">Developer</Link>
              </Router>
            </li>
            <li>
              <Router>
                <Link to="/" id="sign-up">
                  Sign Up
                </Link>
              </Router>
            </li>
          </>
        )}

        {!user ? (
          <li>
            <Router>
              <Link to="/">Sign In</Link>
            </Router>
          </li>
        ) : (
          <div id="payment-nav">
            <li>
              <Router>
                <Link to="notFound" id="pay-history" onClick={handleHistory}>
                  Payment History
                </Link>
              </Router>
            </li>

            <li onClick={handleSignOut}>
              <Router>
                <Link to="/" id="sign-out">
                  Sign Out
                </Link>
              </Router>
            </li>
          </div>
        )}
      </ul>
    </nav>
  );
}

export default Header;
