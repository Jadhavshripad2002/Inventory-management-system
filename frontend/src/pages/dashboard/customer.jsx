import React, { useState, useEffect } from "react";
import axios from "axios";

const Customer = () => {
  const [customers, setCustomers] = useState([]);
  const [formData, setFormData] = useState({
    cName: "",
    email: "",
    phone: "",
    address: "",
    gstNumber: "",
    contactDate: "",
  });
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);

  const API_URL = "http://localhost:5000/api/customer";


  const fetchCustomers = async () => {
    try {
      const res = await axios.get(`${API_URL}/view`);
      setCustomers(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
    
        await axios.put(`${API_URL}/update/${editId}`, formData);
        alert("Customer updated successfully");
      } else {
       
        await axios.post(`${API_URL}/add`, formData);
        alert("Customer added successfully");
      }
      setFormData({
        cName: "",
        email: "",
        phone: "",
        address: "",
        gstNumber: "",
        contactDate: "",
      });
      setEditId(null);
      fetchCustomers();
    } catch (err) {
      console.error("Save error:", err);
    }
  };


  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      try {
        await axios.delete(`${API_URL}/delete/${id}`);
        alert("Customer deleted successfully");
        fetchCustomers();
      } catch (err) {
        console.error("Delete error:", err);
      }
    }
  };

 
  const handleEdit = (customer) => {
    setFormData(customer);
    setEditId(customer.customerId);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`${API_URL}/searchCustomer/name`, {
        params: { name: search },
      });
      setCustomers(res.data);
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Customer Management</h2>

 
      <form className="d-flex mb-3" onSubmit={handleSearch}>
        <input
          type="text"
          className="form-control me-2"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn btn-primary">Search</button>
        <button
          className="btn btn-secondary ms-2"
          type="button"
          onClick={fetchCustomers}
        >
          Reset
        </button>
      </form>

    
      <form onSubmit={handleSubmit} className="card p-3 mb-4 shadow-sm">
        <h5>{editId ? "Update Customer" : "Add Customer"}</h5>
        <div className="row g-3">
          <div className="col-md-4">
            <input
              type="text"
              name="cName"
              placeholder="Name"
              className="form-control"
              value={formData.cName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              className="form-control"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              name="address"
              placeholder="Address"
              className="form-control"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              name="gstNumber"
              placeholder="GST Number"
              className="form-control"
              value={formData.gstNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-4">
            <input
              type="date"
              name="contactDate"
              className="form-control"
              value={formData.contactDate}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <button className="btn btn-success mt-3">
          {editId ? "Update" : "Add"}
        </button>
      </form>

 
      <table className="table table-bordered table-striped shadow-sm">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>GST Number</th>
            <th>Contact Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.length > 0 ? (
            customers.map((cust) => (
              <tr key={cust.customerId}>
                <td>{cust.customerId}</td>
                <td>{cust.cName}</td>
                <td>{cust.email}</td>
                <td>{cust.phone}</td>
                <td>{cust.address}</td>
                <td>{cust.gstNumber}</td>
                <td>{cust.contactDate}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEdit(cust)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(cust.customerId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">
                No customers found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Customer;
