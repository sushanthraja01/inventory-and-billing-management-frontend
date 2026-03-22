import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

export default function InventoryPage() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    id: "",
    name: "",
    price: "",
    quantity: "",
    expire: "",
  });
  const { authFetch } = useAuth();

  const fetchInventory = async () => {
    try {
      const res = await authFetch("/api/inventory");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Error loading inventory:", err);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await authFetch("/api/inventory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Failed to add product");
        return;
      }

      setForm({ id: "", name: "", price: "", quantity: "", expire: "" });
      fetchInventory();
    } catch (err) {
      alert("Error adding product");
    }
  };

  const handleUpdate = async (product, index) => {
    const today = new Date();
    const expiryDate = new Date(product.expire);
    if (expiryDate < today) {
      alert("The product is expired and cannot be updated.");
      fetchInventory();
      return;
    }

    try {
      const res = await authFetch(`/api/inventory/${product._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: product.name,
          price: product.price,
          quantity: product.quantity,
          expire: product.expire,
        }),
      });
      const data = await res.json();

      if (res.ok) {
        alert("Product updated!");
        fetchInventory();
      } else {
        alert(data.error || "Failed to update product.");
      }
    } catch (err) {
      alert("Error updating product");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await authFetch(`/api/inventory/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("Product deleted!");
        fetchInventory();
      } else {
        alert("Failed to delete product.");
      }
    } catch (err) {
      alert("Error deleting product");
    }
  };

  const updateProductField = (index, field, value) => {
    setProducts((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  return (
    <>
      <div className="head">
        <Navbar />
        <br />
        <form onSubmit={handleAdd}>
          <div className="inventory-form">
            <input
              className="ui"
              type="number"
              placeholder="Item ID"
              value={form.id}
              onChange={(e) => setForm({ ...form, id: e.target.value })}
            />
            <input
              className="ui"
              type="text"
              placeholder="Product Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              className="ui"
              type="number"
              placeholder="Price"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
            <input
              className="ui"
              type="number"
              placeholder="Stock"
              value={form.quantity}
              onChange={(e) => setForm({ ...form, quantity: e.target.value })}
            />
            <input
              className="ui"
              type="date"
              placeholder="Expiry Date"
              value={form.expire}
              onChange={(e) => setForm({ ...form, expire: e.target.value })}
            />
            <button type="submit">Add Item</button>
          </div>
        </form>
      </div>

      <div
        style={{
          maxHeight: "calc(100vh - 200px)",
          overflowY: "auto",
          overflowX: "auto",
        }}
      >
        <table id="inventoryTable">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Expiry</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="6">No products found.</td>
              </tr>
            ) : (
              products.map((product, index) => (
                <tr key={product._id}>
                  <td>{product.id}</td>
                  <td>
                    <input
                      type="text"
                      value={product.name}
                      onChange={(e) =>
                        updateProductField(index, "name", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={product.price}
                      onChange={(e) =>
                        updateProductField(index, "price", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={product.quantity}
                      onChange={(e) =>
                        updateProductField(index, "quantity", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      value={
                        product.expire
                          ? product.expire.split("T")[0]
                          : ""
                      }
                      onChange={(e) =>
                        updateProductField(index, "expire", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <button onClick={() => handleUpdate(product, index)}>
                      Update
                    </button>
                    <button onClick={() => handleDelete(product._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
