import React, { useEffect, useState } from "react";
import axios from "axios";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [formData, setFormData] = useState({
    cName: "",
    email: "",
    phone: "",
    address: "",
    gstNumber: "",
    contactDate: "",
  });
  const [editId, setEditId] = useState(null);
  const [searchName, setSearchName] = useState("");

  const fetchCustomers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/customer/view");
      setCustomers(res.data);
    } catch (err) {
      console.error("Error fetching customers", err);
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
        await axios.put(
          `http://localhost:5000/api/customer/update/${editId}`,
          formData
        );
      } else {
        await axios.post("http://localhost:5000/api/customer/add", formData);
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
      console.error("Error saving customer", err);
    }
  };


  const handleEdit = (customer) => {
    setFormData(customer);
    setEditId(customer.customerId);
  };

  
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/customer/delete/${id}`);
      fetchCustomers();
    } catch (err) {
      console.error("Error deleting customer", err);
    }
  };


  const handleSearch = async () => {
    if (!searchName.trim()) {
      fetchCustomers();
      return;
    }
    try {
      const res = await axios.get(
        `http://localhost:5000/api/customer/searchCustomer/name?name=${searchName}`
      );
      setCustomers(res.data);
    } catch (err) {
      console.error("Error searching customer", err);
    }
  };


  const handleClearSearch = () => {
    setSearchName("");
    fetchCustomers();
  };

  return (
    <div className="container mt-4">
      <h2>Customer Management</h2>

   
      <div className="d-flex mb-3">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Search by name..."
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <button className="btn btn-primary me-2" onClick={handleSearch}>
          Search
        </button>
        {searchName && (
          <button className="btn btn-secondary" onClick={handleClearSearch}>
        Reset
          </button>
        )}
      </div>

   
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row g-3">
          <div className="col-md-6">
            <input
              type="text"
              name="cName"
              placeholder="Customer Name"
              className="form-control"
              value={formData.cName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <input type="email"name="email"
              placeholder="Email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
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
          <div className="col-md-6">
            <input
              type="text"
              name="address"
              placeholder="Address"
              className="form-control"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              name="gstNumber"
              placeholder="GST Number"
              className="form-control"
              value={formData.gstNumber}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <input
              type="date"
              name="contactDate"
              className="form-control"
              value={formData.contactDate}
              onChange={handleChange}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-success mt-3">
          {editId ? "Update Customer" : "Add Customer"}
        </button>
      </form>

      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>GST</th>
            <th>Contact Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.length > 0 ? (
            customers.map((c) => (
              <tr key={c.customerId}>
                <td>{c.customerId}</td>
                <td>{c.cName}</td>
                <td>{c.email}</td>
                <td>{c.phone}</td>
                <td>{c.address}</td>
                <td>{c.gstNumber}</td>
                <td>{c.contactDate}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEdit(c)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(c.customerId)}
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

export default Customers;
