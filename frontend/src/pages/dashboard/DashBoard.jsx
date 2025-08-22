
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/dashboard.css"; 

const Dashboard = () => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/dashboard/stats", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="dashboard-container">
      
      <div className="sidebar">
        <h2>Inventory MS</h2>
        <ul>
          <li><Link to="/dashboard">Dashboard</Link></li>
  <li><Link to="/customers">Customers</Link></li>
  <li><Link to="/suppliers">Suppliers</Link></li>
  <li><Link to="/products">Products</Link></li>
  <li><Link to="/categories">Categories</Link></li>
  <li><Link to="/stock">Stock</Link></li>
  <li><Link to="/purchases">Purchases</Link></li>
  <li><Link to="/sales">Sales</Link></li>
  <li><Link to="/logout">Logout</Link></li>
        </ul>
      </div>

     
      <div className="main-content">
        <h1>Dashboard</h1>
        <div className="stats-cards">
          <div className="card">Customers: {stats.customers}</div>
          <div className="card">Suppliers: {stats.suppliers}</div>
          <div className="card">Products: {stats.products}</div>
          <div className="card">Categories: {stats.categories}</div>
          <div className="card">Stock Items: {stats.stock}</div>
          <div className="card">Purchases: {stats.purchases}</div>
          <div className="card">Sales: {stats.sales}</div>
          <div className="card">Logout: {stats.Logout}</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
