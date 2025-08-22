import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Supplier() {
  const [suppliers, setSuppliers] = useState([]);
  const [form, setForm] = useState({
    sName: "",
    contactDate: "",
    phone: "",
    companyName: "",
    email: "",
    address: "",
    gstNumber: "",
  });
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");


  const loadSuppliers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/supplier/view");
      setSuppliers(res.data);
    } catch (err) {
      console.error("Error loading suppliers:", err);
    }
  };

  useEffect(() => {
    loadSuppliers();
  }, []);

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(
          `http://localhost:5000/api/supplier/update/${editId}`,
          form
        );
      } else {
        await axios.post("http://localhost:5000/api/supplier/add", form);
      }
      setForm({
        sName: "",
        contactDate: "",
        phone: "",
        companyName: "",
        email: "",
        address: "",
        gstNumber: "",
      });
      setEditId(null);
      loadSuppliers();
    } catch (err) {
      console.error("Error saving supplier:", err);
    }
  };

  
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/supplier/delete/${id}`);
      loadSuppliers();
    } catch (err) {
      console.error("Error deleting supplier:", err);
    }
  };


  const handleEdit = (supplier) => {
    setForm(supplier);
    setEditId(supplier.supplierId);
  };

 
  const handleSearch = async () => {
    try {
      if (search.trim() === "") {
        loadSuppliers();
        return;
      }
      const res = await axios.get(
        `http://localhost:5000/api/supplier/searchSupplier/name?name=${search}`
      );
      setSuppliers(res.data);
    } catch (err) {
      console.error("Error searching supplier:", err);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Supplier Management</h2>

      
      <div className="d-flex mb-4 gap-2">
        <input type="text" className="form-control" placeholder="Search by Supplier Name" value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleSearch}>
          Search
        </button>
        <button className="btn btn-secondary" onClick={loadSuppliers}>
          Reset
        </button>
      </div>

 
      <form
        onSubmit={handleSubmit}
        className="card p-4 shadow-sm mb-4 border-0"
      >
        <div className="row g-3">
          <div className="col-md-4">
            <input  type="text" className="form-control" placeholder="Supplier Name" value={form.sName}
              onChange={(e) => setForm({ ...form, sName: e.target.value })}
              required
            />
          </div>
          <div className="col-md-4">
            <input
              type="date" className="form-control" value={form.contactDate}
              onChange={(e) =>
                setForm({ ...form, contactDate: e.target.value })
              }
              required
            />
          </div>
          <div className="col-md-4">
            <input
              type="text" className="form-control" placeholder="Phone" value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              required
            />
          </div>
          <div className="col-md-4">
            <input type="text" className="form-control" placeholder="Company Name"
              value={form.companyName}
              onChange={(e) =>
                setForm({ ...form, companyName: e.target.value })
              }
            />
          </div>
          <div className="col-md-4">
            <input
              type="email" className="form-control" placeholder="Email"
              value={form.email}
           onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div className="col-md-4">
            <input
              type="text" className="form-control" placeholder="Address" value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              required
            />
          </div>
          <div className="col-md-4">
            <input
              type="text" className="form-control"  placeholder="GST Number" value={form.gstNumber}
              onChange={(e) =>
                setForm({ ...form, gstNumber: e.target.value })
              }
              required
            />
          </div>
          <div className="col-md-12">
            <button type="submit" className="btn btn-success">
              {editId ? "Update Supplier" : "Add Supplier"}
            </button>
          </div>
        </div>
      </form>

      
      <div className="table-responsive">
        <table className="table table-bordered table-striped shadow-sm">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Supplier Name</th>
              <th>Contact Date</th>
              <th>Phone</th>
              <th>Company Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>GST Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((s) => (
              <tr key={s.supplierId}>
                <td>{s.supplierId}</td>
                <td>{s.sName}</td>
                <td>{s.contactDate}</td>
                <td>{s.phone}</td>
                <td>{s.companyName || "-"}</td>
                <td>{s.email}</td>
                <td>{s.address}</td>
                <td>{s.gstNumber}</td>
                <td>
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => handleEdit(s)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(s.supplierId)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

