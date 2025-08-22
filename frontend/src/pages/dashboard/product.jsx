import React, { useEffect, useState } from "react";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    productName: "",
    categoryID: "",
  });
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState(""); // search state

  const fetchProducts = () => {
    axios
      .get("http://localhost:5000/api/product/view")
      .then((res) => {
        if (res.data && res.data.rows) {
          setProducts(res.data.rows);
        }
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId) {
      axios
        .put(`http://localhost:5000/api/product/update/${editId}`, formData)
        .then(() => {
          fetchProducts();
          setFormData({ productName: "", categoryID: "" });
          setEditId(null);
        })
        .catch((err) => console.error(err));
    } else {
      axios
        .post("http://localhost:5000/api/product/add", formData)
        .then(() => {
          fetchProducts();
          setFormData({ productName: "", categoryID: "" });
        })
        .catch((err) => console.error(err));
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      axios
        .delete(`http://localhost:5000/api/product/delete/${id}`)
        .then(() => fetchProducts())
        .catch((err) => console.error(err));
    }
  };

  const handleEdit = (product) => {
    setFormData({
      productName: product.productName,
      categoryID: product.categoryID || "",
    });
    setEditId(product.productId);
  };

  const filteredProducts = products.filter(
    (p) =>
      p.productName.toLowerCase().includes(search.toLowerCase()) ||
      (p.categoryID && p.categoryID.toString().includes(search))
  );

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Products Management</h2>

    
      <div className="row mb-3">
        <div className="col-md-8">
          <form onSubmit={handleSubmit} className="d-flex">
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              className="form-control me-2"
              placeholder="Enter product name"
              required
            />
            <input
              type="number"
              name="categoryID"
              value={formData.categoryID}
              onChange={handleChange}
              className="form-control me-2"
              placeholder="Enter category ID"
            />
            <button type="submit" className="btn btn-primary">
              {editId ? "Update" : "Add"}
            </button>
            {editId && (
              <button
                type="button"
                className="btn btn-secondary ms-2"
                onClick={() => {
                  setFormData({ productName: "", categoryID: "" });
                  setEditId(null);
                }}
              >
                Cancel
              </button>
            )}
          </form>
        </div>

     
        <div className="col-md-4">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name or category ID"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button
                className="btn btn-outline-secondary"
                onClick={() => setSearch("")}
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>


      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>Created Date</th>
            <th>Category ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((p) => (
              <tr key={p.productId}>
                <td>{p.productId}</td>
                <td>{p.productName}</td>
                <td>
                  {p.createdDate
                    ? new Date(p.createdDate).toLocaleDateString()
                    : "N/A"}
                </td>
                <td>{p.categoryID || "N/A"}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleEdit(p)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(p.productId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No products found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
