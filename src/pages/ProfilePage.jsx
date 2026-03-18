import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function ProfilePage() {
  const [email, setEmail] = useState("Loading...");
  const [name, setName] = useState("Loading...");
  const navigate = useNavigate();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await fetch("/api/auth/user/profile");
        const data = await res.json();
        setEmail(data.email || "No email");
        setName(data.name || "No name");
      } catch (err) {
        console.error("Error fetching user data:", err);
        setEmail("Error loading email");
        setName("Error loading name");
      }
    };
    loadProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout");
      navigate("/login");
      window.location.reload();
    } catch (err) {
      alert("Logout failed");
    }
  };

  return (
    <>
      <Navbar />
      <div className="b2 profile-card" id="show-btn">
        <div className="l1">
          <div className="l2">
            <h2>
              <b>Profile</b>
            </h2>
            <b>Email:</b>
            <br />
            <p className="n">{email}</p>
            <b>Name:</b>
            <br />
            <p className="name">{name}</p>
            <div className="r">
              <button className="lo" type="button" onClick={handleLogout}>
                Logout
              </button>
              <br />
              <br />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
