import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

export default function ProfilePage() {
  const [email, setEmail] = useState("Loading...");
  const [name, setName] = useState("Loading...");
  const navigate = useNavigate();
  const { logout, authFetch } = useAuth();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await authFetch("/api/auth/user/profile");
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

  const handleLogout = () => {
    logout();
    navigate("/login");
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
