import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login, API_BASE } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Login failed");
        return;
      }

      // Save token and user data to localStorage via context
      login(data.token, data.user);

      if (data.hasAlerts) {
        alert("Expired/expiring products exist. Check Alerts page.");
      }
      navigate("/home");
    } catch (err) {
      alert("Login failed. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="b2" id="show-btn">
        <div className="l1">
          <div className="l2">
            <h2>
              <b>LOGIN</b>
            </h2>
            <form className="i1" onSubmit={handleLogin}>
              <div className="ib">
                <span className="e">
                  <ion-icon name="mail"></ion-icon>
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder=" "
                />
                <label>E mail</label>
              </div>
              <div className="ib">
                <span className="e">
                  <ion-icon name="lock-closed"></ion-icon>
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder=" "
                />
                <label>Password</label>
              </div>
              <div className="r">
                <button type="submit">Login</button>
                <br />
                <br />
                <a href="#">Forgot Password?</a>
              </div>
              <div className="m">
                <p style={{ color: "black" }}>
                  Do Register as Manager -{" "}
                  <Link to="/signup">Register</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
