import React, { useEffect, useState } from "react";
import axios from "axios";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/categories/view");
      setCategories(res.data);
    } catch (err) {
      showMessage("Failed to fetch categories", true);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const showMessage = (msg, isError = false) => {
    setMessage({ text: msg, error: isError });
    setTimeout(() => setMessage(""), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!categoryName.trim()) return showMessage("Category name required", true);

    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/categories/update/${editId}`, {
          name: categoryName,
        });
        showMessage("Category updated");
      } else {
        await axios.post("http://localhost:5000/api/categories/add", { categoryName });
        showMessage("Category added");
      }
      setCategoryName("");
      setEditId(null);
      fetchCategories();
    } catch (err) {
      showMessage(err.response?.data?.msg || "Something went wrong", true);
    }
  };

  const handleEdit = (cat) => {
    setCategoryName(cat.categoryName);
    setEditId(cat.categoryID);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this category?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/categories/delete/${id}`);
      showMessage("Category deleted");
      fetchCategories();
    } catch {
      showMessage("Failed to delete category", true);
    }
  };

  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearch(value);
    if (!value.trim()) return fetchCategories();

    try {
      const res = await axios.get(
  `http://localhost:5000/api/categories/searchCategory/name?name=${value}`
);

      setCategories(res.data);
    } catch {
      showMessage("Search failed", true);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Categories</h2>

      {message && (
        <div className={`alert ${message.error ? "alert-danger" : "alert-success"}`}
          role="alert"
        >
          {message.text}
        </div>
      )}

      <div className="mb-3 d-flex gap-2">
        <input type="text" placeholder="Search Category"value={search}onChange={handleSearch} className="form-control w-25" />
      </div>

      <form onSubmit={handleSubmit} className="mb-4 d-flex gap-2">
        <input type="text"placeholder="Category Name"value={categoryName} onChange={(e) => setCategoryName(e.target.value)}
          className="form-control w-25"/>
        <button type="submit" className="btn btn-primary">
          {editId ? "Update" : "Add"}
        </button>
        {editId && (
          <button type="button" className="btn btn-secondary" onClick={() => {
               setEditId(null);
              setCategoryName("");
            }}
          >
            Cancel
          </button>
        )}
      </form>

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Created Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center">
                No categories found
              </td>
            </tr>
          ) : (
            categories.map((cat) => (
              <tr key={cat.categoryID}>
                <td>{cat.categoryID}</td>
                <td>{cat.categoryName}</td>
                <td>{new Date(cat.createdDate).toLocaleDateString()}</td>
                <td className="d-flex gap-2">
                  <button
                    className="btn btn-sm btn-warning"
                    onClick={() => handleEdit(cat)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(cat.categoryID)}
                  >
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

export default Category;
