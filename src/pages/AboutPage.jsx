import Navbar from "../components/Navbar";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <div className="b page-content">
        <br />
        <p>
          Welcome to our Hotel Billing and Inventory Management System, a smart
          and efficient solution designed to simplify daily operations in hotel
          businesses. This project is tailored to help hotels manage their
          inventory, billing processes, and stock flow with ease and precision.
        </p>
        <br />
        <p>
          We aim to reduce manual errors, save time, and improve decision-making
          through intelligent automation and real-time insights. Whether it's
          tracking stock, applying offers, or generating invoices, our system
          handles it all smoothly—so hotel managers can focus on delivering
          better guest experiences.
        </p>
      </div>
    </>
  );
}
