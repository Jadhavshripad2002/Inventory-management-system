

import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/layout/Header.jsx";
import Footer from "../../components/layout/Footer.jsx";
import { FaBox, FaUsers, FaUserShield } from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();

  // Refs for smooth scrolling
  const featuresRef = useRef(null);
  const aboutRef = useRef(null);
 const testimonialsRef = useRef(null);
 const contactRef = useRef(null);
  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <Header onScrollToFeatures={() => scrollToSection(featuresRef)} onScrollToAbout={() => scrollToSection(aboutRef)} />

      {/* Hero Section */}
      <div style={styles.container}>
        <h1>Welcome to Inventory Management System</h1>
        <p>Manage your products, suppliers, and stock easily.</p>
        <button style={styles.button} onClick={() => navigate("/login")}>
          Get Start
        </button>
      </div>

      {/* Features Section */}
      <section ref={featuresRef} id="features" style={styles.featuresSection}>
        <h2 style={styles.featuresTitle}>Features</h2>
        <div style={styles.featuresGrid}>
          <div style={styles.featureCard}>
            <FaBox size={50} color="#3b4cca" />
            <h3>Stock Management</h3>
            <p>Track, add, and update product inventory in real-time with ease.</p>
          </div>

          <div style={styles.featureCard}>
            <FaUsers size={50} color="#1ca14e" />
            <h3>Customer & Supplier Records</h3>
            <p>Maintain organized records for all customers and suppliers.</p>
          </div>

          <div style={styles.featureCard}>
            <FaUserShield size={50} color="#f5a623" />
            <h3>Role-Based Access</h3>
            <p>Separate permissions for admin and staff.</p>
          </div>
        </div>
      </section>

    



      {/* About Us Section */}
      <section ref={aboutRef} id="about" style={styles.aboutSection}>
        <h2 style={styles.aboutTitle}>About Our Inventory Management System</h2>
        <p style={styles.aboutText}>
          Our Inventory Management System is a full-stack web application designed to simplify stock
          tracking, supplier management, and sales reporting. Built using React for the frontend,
          Node.js & Express.js for the backend, and MySQL for the database, it provides a secure and
          user-friendly platform for businesses to manage their operations efficiently.
        </p>
        <p style={styles.aboutText}>
          Whether you run a small shop or a large company, the system offers real-time updates,
          role-based access, and clear insights to support smart business decisions.
        </p>
      </section>


      {/*  Testimonials Section */}
      <section ref={testimonialsRef} id="testimonials" style={styles.testimonialsSection}>
        <h2 style={styles.testimonialsTitle}>What Our Users Say</h2>
        <div style={styles.testimonialsGrid}>
          <div style={styles.testimonialCard}>
            <p>"This system has made managing my shop so much easier!"</p>
            <h4>- Eknath Rathod, Shop Owner</h4>
          </div>
          <div style={styles.testimonialCard}>
            <p>"Now I can track stock and suppliers in one place. Highly recommended!"</p>
            <h4>- Ramkishan, Manager</h4>
          </div>
          <div style={styles.testimonialCard}>
            <p>"The role-based access ensures my staff only see what they need."</p>
            <h4>- Shripad Jadhav, Business Owner</h4>
          </div>
        </div>
      </section>

      {/* contact us section */}

<section id="contact" style={styles.contactSection}>
  <h2 style={styles.contactTitle}>Contact Us</h2>

  <div style={styles.contactInfo}>
    <p><strong>Name:</strong> Shripad Jadhav</p>
    <p><strong>Phone:</strong> +91 7821952366</p>
    <p><strong>Email:</strong> jadhavshripad2002@gmail.com</p>
  </div>
  <form
    onSubmit={async (e) => {
      e.preventDefault();
      const formData = {
        name: e.target.name.value,
        email: e.target.email.value,
        message: e.target.message.value,
      };

      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      alert(data.message);
      e.target.reset();
    }}
    style={styles.contactForm}
  >
    <input type="text" name="name" placeholder="Your Name" required />
    <input type="email" name="email" placeholder="Your Email" required />
    <textarea name="message" placeholder="Your Message" required></textarea>
    <button type="submit" style={styles.button}>Send Message</button>
  </form>
</section>


      <Footer />
    </div>
  );
};





const styles = {
  container: {
    textAlign: "left",
    padding: "80px 50px",
    maxWidth: "600px",
    
  },
  button: {
    background: "#3b4cca",
    color: "white",
    border: "none",
    padding: "12px 30px",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "20px",
    fontSize: "16px",
  },
  featuresSection: {
    background: "#eaf4ff",
    padding: "60px 20px",
    textAlign: "center",
  },
  featuresTitle: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "40px",
  },
  featuresGrid: {
    display: "flex",
    justifyContent: "center",
    gap: "40px",
    flexWrap: "wrap",
  },
  featureCard: {
    maxWidth: "300px",
    textAlign: "center",
    padding: "20px",
  },
  aboutSection: {
    background: "#c9d6e3",
    padding: "80px 40px",
    textAlign: "center",
  },
  aboutTitle: {
    fontSize: "30px",
    fontWeight: "bold",
    marginBottom: "30px",
  },
  aboutText: {
    fontSize: "18px",
    lineHeight: "1.8",
    maxWidth: "900px",
    margin: "10px auto",
  },

  testimonialsSection: {
    background: "#f9f9f9",
    padding: "80px 40px",
    textAlign: "center",
  },
  testimonialsTitle: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "40px",
  },
  testimonialsGrid: {
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    flexWrap: "wrap",
  },
  testimonialCard: {
    maxWidth: "300px",
    background: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
  },
contactSection: {
  padding: "50px",
  background: "#f4f4f9",
  textAlign: "center",
},

contactTitle: {
  fontSize: "28px",
  marginBottom: "20px",
},

contactInfo: {
  marginBottom: "30px",
  fontSize: "18px",
  lineHeight: "1.8",
  color: "#333",
},

contactForm: {
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  maxWidth: "400px",
  margin: "0 auto",
},

};

export default Home;
