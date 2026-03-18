import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    fetch("/api/auth/check-login-status")
      .then((res) => res.json())
      .then((data) => setLoggedIn(data.loggedIn))
      .catch(() => setLoggedIn(false));
  }, []);

  return (
    <>
      <div className="d1">
        <h2
          style={{
            color: "black",
            fontFamily: "arial",
            fontSize: "25px",
            textAlign: "center",
          }}
        >
          INVENTORY AND BILLING MANAGEMENT SYSTEM
        </h2>
      </div>
      <hr />
      <div className="d2">
        <nav>
          <Link to="/home">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/services">Services</Link>
          <Link to="/contactus">Contact us</Link>
        </nav>
        {loggedIn ? (
          <div className="alert-icons">
            <Link to="/alerts">
              <button
                className="icon-btn"
                type="button"
              >
                <ion-icon name="notifications-circle-outline"></ion-icon>
              </button>
            </Link>
            <Link to="/profile">
              <button
                className="icon-btn"
                type="button"
              >
                <ion-icon name="person-circle-outline"></ion-icon>
              </button>
            </Link>
          </div>
        ) : (
          <Link to="/login">
            <button className="b1" type="button">
              Login
            </button>
          </Link>
        )}
      </div>
    </>
  );
}
