import React, { useEffect, useState } from "react";
import ProductService from "../../services/ProductService";
import "../../styles/dashboard.css";

const Product = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ productName: "", categoryID: "", createdDate: "" });
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await ProductService.getAllProducts();
      setItems(data);
    } catch (e) {
      alert("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const add = async (e) => {
    e.preventDefault();
    try {
      await ProductService.addProduct(form);
      setForm({ productName: "", categoryID: "", createdDate: "" });
      load();
    } catch (e) {
      alert(e?.response?.data?.msg || "Add failed");
    }
  };

  const remove = async (id) => {
    if (!confirm("Delete product?")) return;
    try {
      await ProductService.deleteProduct(id);
      load();
    } catch (e) {
      alert("Delete failed");
    }
  };

  return (
    <div className="page-pad">
      <h2>Products</h2>

      <form className="grid-3" onSubmit={add}>
        <input
          name="productName"
          placeholder="Product name"
          value={form.productName}
          onChange={change}
          required
        />
        <input
          name="categoryID"
          placeholder="Category ID"
          value={form.categoryID}
          onChange={change}
          required
        />
        <input
          name="createdDate"
          type="date"
          value={form.createdDate}
          onChange={change}
          required
        />
        <button className="btn-primary" type="submit">Add</button>
      </form>

      <div className="table-wrap">
        {loading ? (
          <p>Loading…</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th><th>Name</th><th>Category</th><th>Created</th><th>Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map(p => (
                <tr key={p.productId}>
                  <td>{p.productId}</td>
                  <td>{p.productName}</td>
                  <td>{p.categoryID ?? "-"}</td>
                  <td>{p.createdDate?.slice(0,10)}</td>
                  <td>
                    <button className="btn-danger" onClick={() => remove(p.productId)}>Delete</button>
                  </td>
                </tr>
              ))}
              {!items.length && (
                <tr><td colSpan="5" style={{textAlign:'center'}}>No products</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Product;
