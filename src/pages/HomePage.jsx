import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <div className="d3">
        <Link to="/inventory">
          <button>
            <div className="mod">
              <div className="i">
                <img
                  src="https://cdn-icons-png.freepik.com/512/2825/2825867.png?ga=GA1.1.2020357789.1738776517"
                  width="250px"
                  height="250px"
                  alt="Inventory"
                />
              </div>
              <h1
                style={{
                  color: "black",
                  fontWeight: "bold",
                  textOrientation: "upright",
                }}
              >
                INVENTORY
              </h1>
            </div>
          </button>
        </Link>

        <Link to="/billing">
          <button>
            <div className="mod">
              <div className="i">
                <img
                  src="https://cdn-icons-png.freepik.com/512/11338/11338119.png?ga=GA1.1.2020357789.1738776517"
                  width="250px"
                  height="250px"
                  alt="Billing"
                />
              </div>
              <h1
                style={{
                  color: "black",
                  fontWeight: "bold",
                  textOrientation: "upright",
                }}
              >
                BILLING
              </h1>
            </div>
          </button>
        </Link>
      </div>
    </>
  );
}
