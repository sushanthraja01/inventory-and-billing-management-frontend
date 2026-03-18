import Navbar from "../components/Navbar";

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <div className="page-content" style={{ padding: "20px" }}>
        <br />
        <p>
          &nbsp;&nbsp;&nbsp;&nbsp;Welcome to our website inventory and billing
          management system
        </p>
        <br />
        <ul>
          <p>
            <li>Inventory</li>
          </p>
          <p>
            Keeps track of all the stock available in the shop. Alerts users
            when a product is about to expire. Offers discounts on products that
            are nearing expiry to help sell them faster. Suggests how much stock
            to purchase based on the last 6 months of sales for expired or
            low-stock items. Automatically updates the stock after purchases and
            sales.
          </p>
          <br />
          <p>
            <li>Billing Management</li>
          </p>
          <p>
            Allows users to add products to the bill using the item's ID or
            name. Lets users adjust product quantities or remove items from the
            bill. Automatically calculates GST and other charges. Generates a
            final bill receipt for easy transaction processing.
          </p>
        </ul>
      </div>
    </>
  );
}
