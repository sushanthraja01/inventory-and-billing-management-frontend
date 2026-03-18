import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

export default function AlertsPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/alerts")
      .then((res) => res.json())
      .then((data) => {
        setMessages(data.messages || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching alerts:", err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="alerts-container">
        {loading ? (
          <p>Loading alerts...</p>
        ) : messages.length === 0 ? (
          <p>✅ No expired or expiring products.</p>
        ) : (
          messages.map((msg, i) => (
            <div key={i} style={{ marginBottom: "30px" }}>
              <h2>
                <b>{msg.title}</b>
              </h2>
              {msg.products.map((p, j) => (
                <div key={j} style={{ marginLeft: "20px" }}>
                  {msg.type === "expired" ? (
                    <p>
                      &nbsp; - {p.name} (Qty: {p.quantity})
                    </p>
                  ) : (
                    <p>
                      &nbsp; - {p.name} is expiring on {p.expiryDate} (
                      {p.daysRemaining} days left). Quantity: {p.quantity}.
                      Consider applying discounts.
                    </p>
                  )}
                </div>
              ))}
              {msg.type === "expired" && (
                <p>
                  <b>
                    👆The above products are expired. You can remove the above
                    products.
                  </b>
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </>
  );
}
