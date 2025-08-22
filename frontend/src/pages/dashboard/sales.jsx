import React, { useEffect, useState } from "react";
import axios from "axios";

const Sales = () => {
  const [salesData, setSalesData] = useState([]);
  const [formData, setFormData] = useState({
    invoiceNo: "",
    salesDate: "",
    customerId: "",
    items: [],
    totalAmount: "",
    paymentMode: "",
    gstInvoice: "",
  });
  const [editId, setEditId] = useState(null);
  const [searchInvoice, setSearchInvoice] = useState("");

  
  const fetchSales = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/sales/view");
      
      const parsedData = res.data.map((sale) => ({
        ...sale,
        items: typeof sale.items === "string" ? JSON.parse(sale.items) : sale.items,
      }));
      setSalesData(parsedData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);

 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleItemChange = (index, field, value) => {
    const updatedItems = [...formData.items];
    updatedItems[index][field] = value;
    setFormData({ ...formData, items: updatedItems });
  };
  const addItemRow = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { productId: "", quantity: "", price: "" }],
    });
  };

  const removeItemRow = (index) => {
    const updatedItems = [...formData.items];
    updatedItems.splice(index, 1);
    setFormData({ ...formData, items: updatedItems });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/sales/update/${editId}`, formData);
        alert("Sale updated successfully");
      } else {
        await axios.post("http://localhost:5000/api/sales/add", formData);
        alert("Sale added successfully");
      }
      setFormData({
        invoiceNo: "",
        salesDate: "",
        customerId: "",
        items: [],
        totalAmount: "",
        paymentMode: "",
        gstInvoice: "",
      });
      setEditId(null);
      fetchSales();
    } catch (err) {
      console.error(err);
      alert("Error saving sale");
    }
  };

  const handleEdit = (sale) => {
    setEditId(sale.id);
    setFormData({
      invoiceNo: sale.invoiceNo,
      salesDate: sale.salesDate,
      customerId: sale.customerId,
      items: sale.items,
      totalAmount: sale.totalAmount,
      paymentMode: sale.paymentMode,
      gstInvoice: sale.gstInvoice,
    });
  };


  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete this sale?")) {
      try {
        await axios.delete(`http://localhost:5000/api/sales/delete/${id}`);
        alert("Sale deleted successfully");
        fetchSales();
      } catch (err) {
        console.error(err);
        alert("Error deleting sale");
      }
    }
  };

 
  const handleSearch = async () => {
    if (!searchInvoice) {
      fetchSales();
      return;
    }
    try {
      const res = await axios.get(`http://localhost:5000/api/sales/searchSaleByInvoice/${searchInvoice}`);
      const parsedData = res.data.map((sale) => ({
        ...sale,
        items: typeof sale.items === "string" ? JSON.parse(sale.items) : sale.items,
      }));
      setSalesData(parsedData);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Sales Dashboard</h2>

   
      <div className="input-group mb-3">
        <input type="text" className="form-control"  placeholder="Search by invoice number" value={searchInvoice}
          onChange={(e) => setSearchInvoice(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleSearch}>
          Search
        </button>
      </div>

      
      <form onSubmit={handleSubmit} className="mb-4 border p-3 rounded bg-light">
        <div className="row g-3">
          <div className="col-md-3">
            <input type="text" className="form-control"  placeholder="Invoice No" name="invoiceNo" value={formData.invoiceNo}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-3">
            <input type="date" className="form-control"  name="salesDate" value={formData.salesDate} onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-3">
            <input  type="number"  className="form-control"  placeholder="Customer ID"  name="customerId" value={formData.customerId}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-3">
            <input type="text"  className="form-control"  placeholder="Payment Mode" name="paymentMode" value={formData.paymentMode}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        
        <h5 className="mt-3">Items</h5>
        {formData.items.map((item, index) => (
          <div className="row g-2 align-items-center mb-2" key={index}>
            <div className="col-md-3">
              <input
                type="number" className="form-control" placeholder="Product ID" value={item.productId} onChange={(e) => handleItemChange(index, "productId", e.target.value)}
                required
              />
            </div>
            <div className="col-md-3">
              <input
                type="number" className="form-control" placeholder="Quantity"  value={item.quantity}
                onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                required
              />
            </div>
            <div className="col-md-3">
              <input
                type="number" className="form-control" placeholder="Price" value={item.price}
                onChange={(e) => handleItemChange(index, "price", e.target.value)}
                required
              />
            </div>
            <div className="col-md-3">
              <button type="button" className="btn btn-danger"
                onClick={() => removeItemRow(index)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        <button type="button" className="btn btn-secondary mb-3" onClick={addItemRow}>
          Add Item
        </button>

        <div className="mb-3">
          <input
            type="number"
            className="form-control"
            placeholder="Total Amount"
            name="totalAmount"
            value={formData.totalAmount}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="GST Invoice"
            name="gstInvoice"
            value={formData.gstInvoice}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {editId ? "Update Sale" : "Add Sale"}
        </button>
      </form>

      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Invoice No</th>
            <th>Date</th>
            <th>Customer ID</th>
            <th>Items</th>
            <th>Total</th>
            <th>Payment</th>
            <th>GST</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {salesData.map((sale) => (
            <tr key={sale.id}>
              <td>{sale.id}</td>
              <td>{sale.invoiceNo}</td>
              <td>{sale.salesDate}</td>
              <td>{sale.customerId}</td>
              <td>
                {sale.items.map((item, idx) => (
                  <div key={idx}>
                    P:{item.productId}, Q:{item.quantity}, ₹:{item.price}
                  </div>
                ))}
              </td>
              <td>{sale.totalAmount}</td>
              <td>{sale.paymentMode}</td>
              <td>{sale.gstInvoice}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEdit(sale)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(sale.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Sales;
