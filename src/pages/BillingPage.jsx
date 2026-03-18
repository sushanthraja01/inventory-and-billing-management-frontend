import { useState, useRef } from "react";
import Navbar from "../components/Navbar";

export default function BillingPage() {
  const [productInput, setProductInput] = useState("");
  const [quantityInput, setQuantityInput] = useState("");
  const [cart, setCart] = useState([]);
  const [alertMsg, setAlertMsg] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const availableStock = useRef({});

  const addToCart = async () => {
    setAlertMsg("");
    const identifier = productInput.trim();
    const qty = parseInt(quantityInput, 10);

    if (!identifier || !qty || qty <= 0) {
      setAlertMsg("Please enter valid product and quantity.");
      return;
    }

    try {
      const res = await fetch("/api/billing/getProduct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier }),
      });
      const product = await res.json();

      if (!product || !product.name) {
        setAlertMsg("Product not found!");
        return;
      }

      if (qty > product.quantity) {
        setAlertMsg(`${product.name} has only ${product.quantity} in stock.`);
        return;
      }

      if (cart.find((p) => p._id === product._id)) {
        setAlertMsg(`${product.name} is already in the cart.`);
        return;
      }

      availableStock.current[product._id] = product.quantity;
      const taxRate = 18;
      const tax = product.price * (taxRate / 100);
      const total = (product.price + tax) * qty;

      const newItem = {
        _id: product._id,
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: qty,
        originalQuantity: qty,
        taxRate,
        taxApplied: true,
        tax: tax.toFixed(2),
        total: total.toFixed(2),
      };

      await updateInventory(product._id, -qty);
      availableStock.current[product._id] -= qty;
      setCart((prev) => [...prev, newItem]);
      setProductInput("");
      setQuantityInput("");
    } catch (err) {
      setAlertMsg("Error fetching product.");
    }
  };

  const updateInventory = async (productId, qtyChange) => {
    await fetch("/api/billing/updateInventory", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, qtyChange }),
    });
  };

  const removeProduct = async (id) => {
    const product = cart.find((p) => p._id === id);
    if (product) {
      await updateInventory(id, product.quantity);
      availableStock.current[id] += product.quantity;
      setCart((prev) => prev.filter((p) => p._id !== id));
    }
  };

  const toggleTax = (id) => {
    setCart((prev) =>
      prev.map((p) => {
        if (p._id === id) {
          const newTaxApplied = !p.taxApplied;
          const tax = newTaxApplied ? p.price * (p.taxRate / 100) : 0;
          const total = (p.price + tax) * p.quantity;
          return {
            ...p,
            taxApplied: newTaxApplied,
            tax: tax.toFixed(2),
            total: total.toFixed(2),
          };
        }
        return p;
      })
    );
  };

  const updateProductInCart = async (id) => {
    const product = cart.find((p) => p._id === id);
    if (!product) return;

    const newQty = product.quantity;
    const oldQty = product.originalQuantity;
    const totalAvailable = availableStock.current[product._id] + oldQty;

    let finalQty = newQty;
    if (newQty > totalAvailable) {
      alert(
        `Quantity exceeds available stock (${totalAvailable}) for ${product.name}`
      );
      finalQty = totalAvailable;
    }

    const delta = finalQty - oldQty;

    if (delta !== 0) {
      await updateInventory(product._id, -delta);
      availableStock.current[product._id] -= delta;
    }

    setCart((prev) =>
      prev.map((p) => {
        if (p._id === id) {
          const tax = p.taxApplied ? p.price * (p.taxRate / 100) : 0;
          const total = (p.price + tax) * finalQty;
          return {
            ...p,
            quantity: finalQty,
            originalQuantity: finalQty,
            tax: tax.toFixed(2),
            total: total.toFixed(2),
          };
        }
        return p;
      })
    );
  };

  const updateCartField = (id, field, value) => {
    setCart((prev) =>
      prev.map((p) => {
        if (p._id === id) {
          return { ...p, [field]: field === "taxRate" ? parseFloat(value) : parseInt(value) };
        }
        return p;
      })
    );
  };

  const printBill = () => {
    const tableHTML = document.getElementById("billingTable").outerHTML;
    const printWindow = window.open("", "", "height=700,width=900");
    printWindow.document.write(
      "<html><head><title>Print Bill</title></head><body>"
    );
    printWindow.document.write("<h2>Billing Details</h2>");
    printWindow.document.write(tableHTML);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
  };

  const resetCart = () => {
    setCart([]);
    alert("Cart cleared. Inventory already adjusted.");
  };

  const handleSuggestions = async (query) => {
    setProductInput(query);
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }
    try {
      const res = await fetch(`/api/billing/suggestions?q=${query}`);
      const names = await res.json();
      setSuggestions(names);
    } catch {
      setSuggestions([]);
    }
  };

  const grandTotal = cart
    .reduce((sum, p) => sum + parseFloat(p.total), 0)
    .toFixed(2);

  return (
    <div className="billing-page">
      <div className="head">
        <Navbar />
        <br />

        <div style={{ position: "relative", display: "inline-block" }}>
          <input
            type="text"
            id="productInput"
            placeholder="Enter Product ID or Name"
            autoComplete="off"
            value={productInput}
            onChange={(e) => handleSuggestions(e.target.value)}
          />
          {suggestions.length > 0 && (
            <ul id="suggestions">
              {suggestions.map((name, i) => (
                <li
                  key={i}
                  onClick={() => {
                    setProductInput(name);
                    setSuggestions([]);
                  }}
                >
                  {name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <input
          type="number"
          id="quantityInput"
          placeholder="Quantity"
          min="1"
          value={quantityInput}
          onChange={(e) => setQuantityInput(e.target.value)}
        />
        <button onClick={addToCart}>Add Product</button>

        {alertMsg && <div className="billing-alert">{alertMsg}</div>}
      </div>

      <table id="billingTable">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>ID</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Tax %</th>
            <th>Apply Tax</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.productId}</td>
              <td>{product.price}</td>
              <td>
                <input
                  type="number"
                  min="1"
                  value={product.quantity}
                  onChange={(e) =>
                    updateCartField(product._id, "quantity", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  min="0"
                  value={product.taxRate}
                  onChange={(e) =>
                    updateCartField(product._id, "taxRate", e.target.value)
                  }
                />
              </td>
              <td>
                <button onClick={() => toggleTax(product._id)}>
                  {product.taxApplied ? "Remove Tax" : "Add Tax"}
                </button>
              </td>
              <td>₹{product.total}</td>
              <td>
                <button onClick={() => updateProductInCart(product._id)}>
                  Update
                </button>
                <button onClick={() => removeProduct(product._id)}>
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Grand Total: ₹{grandTotal}</h3>

      <div className="print-btns">
        <button onClick={printBill}>Print Bill</button>
        <button onClick={resetCart}>Clear Cart</button>
      </div>
    </div>
  );
}
