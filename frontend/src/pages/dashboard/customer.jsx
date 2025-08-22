import React, { useEffect, useState } from "react";
import axios from "axios";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/categories/view");
      setCategories(res.data);
    } catch (err) {
      console.error("Failed to fetch categories", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!categoryName.trim()) return;

    try {
      if (editId) {
        await axios.put(
          `http://localhost:5000/api/categories/update/${editId}`,
          { categoryName }
        );
      } else {
        await axios.post("http://localhost:5000/api/categories/add", {
          categoryName,
        });
      }
      setCategoryName("");
      setEditId(null);
      fetchCategories();
    } catch (err) {
      console.error("Error saving category:", err);
    }
  };

  const handleEdit = (cat) => {
    setCategoryName(cat.categoryName);
    setEditId(cat.categoryID);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/categories/delete/${id}`);
      fetchCategories();
    } catch (err) {
      console.error("Failed to delete category:", err);
    }
  };

  const handleSearch = async () => {
    if (!search.trim()) {
      fetchCategories();
      return;
    }
    try {
      const res = await axios.get(
        `http://localhost:5000/api/customer/searchCustomer/name?name=${search}`
      );
      setCategories(res.data);
    } catch (err) {
      console.error("Search failed:", err);
      setCategories([]);
    }
  };

  const handleResetSearch = () => {
    setSearch("");
    fetchCategories();
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Category Management</h2>

      <div className="input-group mb-4">
        <input
          type="text" className="form-control" placeholder="Search category" value={search}
          onChange={(e) => setSearch(e.target.value)} />
        <button className="btn btn-primary" onClick={handleSearch}>
          Search
        </button>
        {search && (
          <button className="btn btn-secondary" onClick={handleResetSearch}>
            Reset
          </button>
        )}
      </div>

      <div className="card p-3 mb-4 shadow-sm">
        <form onSubmit={handleSubmit} className="row g-3 align-items-center">
          <div className="col-md-8">
            <input type="text" className="form-control" placeholder="Category Name" value={categoryName} onChange={(e) => setCategoryName(e.target.value)}
              required
            />
          </div>
          <div className="col-md-4">
            <button type="submit" className="btn btn-success w-100">
              {editId ? "Update Category" : "Add Category"}
            </button>
          </div>
        </form>
      </div>

      <div className="table-responsive shadow-sm">
        <table className="table table-striped table-bordered align-middle">
          <thead className="table-dark text-center">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Created Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 ? (
              categories.map((cat) => (
                <tr key={cat.categoryID} className="text-center">
                  <td>{cat.categoryID}</td>
                  <td>{cat.categoryName}</td>
                  <td>{new Date(cat.createdDate).toLocaleDateString()}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEdit(cat)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(cat.categoryID)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center text-muted">
                  No categories found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Categories;
