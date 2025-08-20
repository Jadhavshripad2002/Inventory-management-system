

import React from "react";

const Header = () => {
  return (
    <header style={styles.header}>
      <h2 style={styles.logo}>Inventory Management</h2>
      <nav>
        <ul style={styles.navList}>
          <li><a href="#home" style={styles.link}>Home</a></li>
          <li><a href="#about" style={styles.link}>About Us</a></li>
          <li><a href="#features" style={styles.link}>Features</a></li>
          <li><a href="#contact" style={styles.link}>Contact</a></li>
        </ul>
      </nav>
    </header>
  );
};

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#777da8ff",
    color: "white",
    padding: "15px 40px",
  },
  logo: { margin: 0 },
  navList: {
    listStyle: "none",
    display: "flex",
    gap: "20px",
    margin: 0,
    padding: 0,
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontWeight: "bold",
  }
};

export default Header;

