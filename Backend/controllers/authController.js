const db=require('../config/db');

const bcrypt = require('bcrypt'); //impoert two bcrypt and json webton new code 
const jwt=require('jsonwebtoken');
const { isAdmin } = require('../middleware/authMiddleware');





exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ msg: "All fields are required" });

  db.query('SELECT * FROM admin WHERE email = ?', [email], async (err, rows) => {
    if (err) return res.status(500).json({ msg: "Database error" });
    if (rows.length) return res.status(400).json({ msg: "Admin already exists" });

    try {
      const hashed = await bcrypt.hash(password, 10);
      db.query('INSERT INTO admin (email, password) VALUES (?, ?)', [email, hashed], (err2, result) => {
        if (err2) return res.status(500).json({ msg: "Register error" });
        res.json({ id: result.insertId, msg: 'Admin registered successfully' });
      });
    } catch (hashErr) {
      return res.status(500).json({ msg: "Hash error" });
    }
  });
};


exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM admin WHERE email = ?', [email], async (err, rows) => {
    if (err) return res.status(500).json({ msg: "Database error" });
    if (!rows.length) return res.status(400).json({ msg: "Admin not found" });

    try {
      const isMatch = await bcrypt.compare(password, rows[0].password);
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

      const token = jwt.sign(
        { id: rows[0].id, isAdmin: true },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.json({ token, msg: "Login successful" });
    } catch (error) {
      console.error("Error comparing password:", error);
      res.status(500).json({ msg: "Error comparing password" });
    }
  });
};