import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { isLoggedIn } = useAuth();

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
        {isLoggedIn ? (
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
