import { React, useEffect, useState } from "react";
import { BrowserRouter as Router, Link, useHistory } from "react-router-dom";
import Header from "./Header";

import "../styles/NotFound.css";

function NotFound() {
  const [user, setUser] = useState("");

  useEffect(() => {
    const userObj = JSON.parse(localStorage.getItem("user"));
    setUser(userObj);
  }, []);

  let history = useHistory();
  const handleBack = () => {
    return history.push("/pay");
  };

  return (
    <div className="container">
      <Header user={user} />
      <div id="notfound">
        <h1 id="error_word">Error 404!</h1>
        <h3 id="lost-word">Looks like you are lost!</h3>

        <Router>
          <Link to="pay" id="error_link" onClick={handleBack}>
            Go Back
          </Link>
        </Router>
      </div>
    </div>
  );
}

export default NotFound;
