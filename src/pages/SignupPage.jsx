import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function SignupPage() {
  const [fname, setFname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fname, email, password, cpassword }),
      });
      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Signup failed");
        return;
      }

      alert("Registration successful!");
      navigate("/login");
    } catch (err) {
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="b2" id="show-btn2">
        <div className="r1">
          <div className="l2">
            <h2>
              <b>REGISTER</b>
            </h2>
            <form className="i1" onSubmit={handleSignup}>
              <div className="ib">
                <span className="e">
                  <ion-icon name="person"></ion-icon>
                </span>
                <input
                  type="text"
                  value={fname}
                  onChange={(e) => setFname(e.target.value)}
                  required
                  placeholder=" "
                />
                <label>Full Name</label>
              </div>
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
                <label>E-mail</label>
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
                  minLength="6"
                  placeholder=" "
                />
                <label>Password</label>
              </div>
              <div className="ib">
                <span className="e">
                  <ion-icon name="lock-closed"></ion-icon>
                </span>
                <input
                  type="password"
                  value={cpassword}
                  onChange={(e) => setCpassword(e.target.value)}
                  required
                  minLength="6"
                  placeholder=" "
                />
                <label>Confirm Password</label>
              </div>
              <div className="r">
                <button type="submit">REGISTER</button>
                <br />
                <br />
              </div>
              <div className="m">
                <p style={{ color: "black" }}>
                  Already have an account? -{" "}
                  <Link to="/login">Login</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
