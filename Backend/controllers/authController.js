const db=require('../config/db');

const bcrypt = require('bcrypt'); //impoert two bcrypt and json webton new code 
const jwt=require('jsonwebtoken');
const { isAdmin } = require('../middleware/authMiddleware');


//old code for register
// exports.register=(req,res)=>{
//   const{name,email,password}=req.body;
//   if(!name||!email||!password)return res.status(400).json({msg:"all fields required"});
//   if(password.length<6)return res.status(400).json({msg:"password at least 6 charecters"});
//   db.query('select*from admin where email=?',[email],(err,result)=>{
//     if(err) return res.status(500).json({msg:"DB errror"});
//     if(result.length) return res.status(400).json({msg:"email already exists"});
//     db.query('insert into admin(name,email,password) values(?,?,?)',[name,email,password],(err,result)=>{
//       (err2)=>{
//         if(err2) return res.status(500).json({msg:"insert error"});
//         res.json({msg:'register successfully'});
//       };
//     });
//   });
// };




//old code for login run successfully

// exports.login=(req,res)=>{
//   const{email,password}=req.body;
//   if(!email||!password) return res.status(400).json({msg:"all fiels are required"});

//  db.query('SELECT * FROM admin WHERE email = ? AND password = ?', [email, password], (err, result) => {
//     if (err) return res.status(500).json({ msg: 'DB error' });
//     if (!result.length) return res.status(401).json({ msg: 'Invalid credentials' });
//     res.json({ msg: 'Login successful' });
//   });
// };



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