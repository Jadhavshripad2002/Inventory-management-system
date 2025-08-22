import React, { useEffect, useState } from "react";
import axios from "axios";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  // Fetch categories
  const fetchCategories = async () => {
    const res = await axios.get("http://localhost:5000/api/categories/view");
    setCategories(res.data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Add / Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!categoryName.trim()) return alert("Category name required");

    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/categories/update/${editId}`, {
          categoryName,
        });
        alert("Category updated");
      } else {
        await axios.post("http://localhost:5000/api/categories/add", { categoryName });
        alert("Category added");
      }
      setCategoryName("");
      setEditId(null);
      fetchCategories();
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  // Edit
  const handleEdit = (cat) => {
    setCategoryName(cat.categoryName);
    setEditId(cat.categoryID);
  };

  // Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this category?")) return;
    await axios.delete(`http://localhost:5000/api/categories/delete/${id}`);
    fetchCategories();
  };

  // Search categories
  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value.trim() === "") {
      fetchCategories();
    } else {
      const res = await axios.get(
        `http://localhost:5000/api/categories/search?name=${value}`
      );
      setCategories(res.data);
    }
  };

  return (
    <div>
      <h2>Categories</h2>

      <div style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Search Category..."
          value={search}
          onChange={handleSearch}
        />
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Category Name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <button type="submit">{editId ? "Update" : "Add"}</button>
      </form>

      <table border="1" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Created Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat.categoryID}>
              <td>{cat.categoryID}</td>
              <td>{cat.categoryName}</td>
              <td>{new Date(cat.createdDate).toLocaleDateString()}</td>
              <td>
                <button onClick={() => handleEdit(cat)}>Edit</button>
                <button onClick={() => handleDelete(cat.categoryID)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Category;
