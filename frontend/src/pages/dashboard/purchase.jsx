import React, { useEffect, useState } from "react";
import axios from "axios";

const Purchase = () => {
  const [purchases, setPurchases] = useState([]);
  const [purchaseData, setPurchaseData] = useState({
    purchaseDate: "",
    supplierId: "",
    items: [{ productId: "", quantity: "" }],
    totalAmount: "",
    paymentMode: "",
    gstInvoice: "",
  });
  const [editId, setEditId] = useState(null);
  const [searchInvoice, setSearchInvoice] = useState("");
  const [message, setMessage] = useState("");

  const fetchPurchases = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/purchase/view");
      const data = res.data.map((p) => ({
        ...p,
        items: typeof p.items === "string" ? JSON.parse(p.items) : p.items,
      }));
      setPurchases(data);
    } catch {
      showMessage("Failed to fetch purchases", true);
    }
  };

  useEffect(() => {
    fetchPurchases();
  }, []);

  const showMessage = (msg, isError = false) => {
    setMessage({ text: msg, error: isError });
    setTimeout(() => setMessage(""), 3000);
  };

 
  const handleChange = (e, index, field) => {
    if (field === "items") {
      const newItems = [...purchaseData.items];
      newItems[index][e.target.name] = e.target.value;
      setPurchaseData({ ...purchaseData, items: newItems });
    } else {
      setPurchaseData({ ...purchaseData, [field]: e.target.value });
    }
  };

  const handleAddItem = () => {
    setPurchaseData({
      ...purchaseData,
      items: [...purchaseData.items, { productId: "", quantity: "" }],
    });
  };

  const handleRemoveItem = (index) => {
    const newItems = purchaseData.items.filter((_, i) => i !== index);
    setPurchaseData({ ...purchaseData, items: newItems });
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { purchaseDate, supplierId, items, totalAmount, paymentMode, gstInvoice } =
      purchaseData;

    if (!purchaseDate || !supplierId || !items.length || !totalAmount || !paymentMode || !gstInvoice) {
      return showMessage("All fields are required", true);
    }

    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/purchase/update/${editId}`, purchaseData);
        showMessage("Purchase updated successfully");
      } else {
        await axios.post("http://localhost:5000/api/purchase/add", purchaseData);
        showMessage("Purchase added successfully");
      }

      setPurchaseData({
        purchaseDate: "",
        supplierId: "",
        items: [{ productId: "", quantity: "" }],
        totalAmount: "",
        paymentMode: "",
        gstInvoice: "",
      });
      setEditId(null);
      fetchPurchases();
    } catch (err) {
      showMessage(err.response?.data?.msg || "Something went wrong", true);
    }
  };

  const handleEdit = (purchase) => {
    setPurchaseData({
      purchaseDate: purchase.purchaseDate,
      supplierId: purchase.supplierId,
      items: typeof purchase.items === "string" ? JSON.parse(purchase.items) : purchase.items,
      totalAmount: purchase.totalAmount,
      paymentMode: purchase.paymentMode,
      gstInvoice: purchase.gstInvoice,
    });
    setEditId(purchase.purchaseId);
  };

  
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this purchase?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/purchase/delete/${id}`);
      showMessage("Purchase deleted successfully");
      fetchPurchases();
    } catch {
      showMessage("Failed to delete purchase", true);
    }
  };

  
  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearchInvoice(value);
    if (!value.trim()) return fetchPurchases();

    try {
      const res = await axios.get(`http://localhost:5000/api/purchase/searchInvoice/${value}`);
      const data = res.data.map((p) => ({
        ...p,
        items: typeof p.items === "string" ? JSON.parse(p.items) : p.items,
      }));
      setPurchases(data);
    } catch {
      showMessage("Invoice not found", true);
      setPurchases([]);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Purchase Management</h2>

      {message && (
        <div className={`alert ${message.error ? "alert-danger" : "alert-success"}`} role="alert">
          {message.text}
        </div>
      )}

      <div className="mb-3 d-flex gap-2">
        <input type="text" placeholder="Search by Invoice..." value={searchInvoice} onChange={handleSearch}
 className="form-control w-25"
        />
      </div>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row g-2">
          <div className="col-md-3">
            <input type="date" className="form-control" value={purchaseData.purchaseDate}
              onChange={(e) => handleChange(e, null, "purchaseDate")}
            />
          </div>
          <div className="col-md-3">
            <input
              type="number" placeholder="Supplier ID" className="form-control" value={purchaseData.supplierId}
              onChange={(e) => handleChange(e, null, "supplierId")}
            />
          </div>
          <div className="col-md-3">
            <input type="number" placeholder="Total Amount" className="form-control" value={purchaseData.totalAmount}
              onChange={(e) => handleChange(e, null, "totalAmount")} />
          </div>
          <div className="col-md-3">
            <input
              type="text"  placeholder="Payment Mode"  className="form-control" value={purchaseData.paymentMode}
              onChange={(e) => handleChange(e, null, "paymentMode")}
            />
          </div>
          <div className="col-md-3 mt-2">
            <input
              type="text"
              placeholder="Invoice Number"
              className="form-control"
              value={purchaseData.gstInvoice}
              onChange={(e) => handleChange(e, null, "gstInvoice")}
            />
          </div>
        </div>

        <div className="mt-3">
          <h5>Items</h5>
          {purchaseData.items.map((item, index) => (
            <div key={index} className="d-flex gap-2 mb-2">
              <input type="number" name="productId" placeholder="Product ID" className="form-control" value={item.productId}
                onChange={(e) => handleChange(e, index, "items")}
              />
              <input type="number"  name="quantity" placeholder="Quantity" className="form-control"  value={item.quantity}
                onChange={(e) => handleChange(e, index, "items")}
              />
              {index > 0 && (
                <button type="button" className="btn btn-danger" onClick={() => handleRemoveItem(index)}>
                  Remove
                </button>
              )}
            </div>
          ))}
          <button type="button" className="btn btn-secondary btn-sm" onClick={handleAddItem}>
            Add Item
          </button>
        </div>

        <div className="mt-3">
          <button type="submit" className="btn btn-primary">
            {editId ? "Update Purchase" : "Add Purchase"}
          </button>
          {editId && (
            <button
              type="button" className="btn btn-secondary ms-2" onClick={() => {
                setEditId(null);
                setPurchaseData({
                  purchaseDate: "",
                  supplierId: "",
                  items: [{ productId: "", quantity: "" }],
                  totalAmount: "",
                  paymentMode: "",
                  gstInvoice: "",
                });
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <table className="table table-bordered table-striped mt-4">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Supplier ID</th>
            <th>Items</th>
            <th>Total Amount</th>
            <th>Payment Mode</th>
            <th>Invoice</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {purchases.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center">
                No purchases found
              </td>
            </tr>
          ) : (
            purchases.map((p) => (
              <tr key={p.purchaseId}>
                <td>{p.purchaseId}</td>
                <td>{new Date(p.purchaseDate).toLocaleDateString()}</td>
                <td>{p.supplierId}</td>
                <td>
                  {p.items.map((item, i) => (
                    <div key={i}>
                      Product: {item.productId}, Qty: {item.quantity}
                    </div>
                  ))}
                </td>
                <td>{p.totalAmount}</td>
                <td>{p.paymentMode}</td>
                <td>{p.gstInvoice}</td>
                <td className="d-flex gap-2">
                  <button className="btn btn-warning btn-sm" onClick={() => handleEdit(p)}>
                    Edit
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(p.purchaseId)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Purchase;
