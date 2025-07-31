const db=require('../config/db');
exports.register=(req,res)=>{
  const{name,email,password}=req.body;
  if(!name||!email||!password)return res.status(400).json({msg:"all fields required"});
  if(password.length<6)return res.status(400).json({msg:"password at least 6 charecters"});
  db.query('select*from admin where email=?',[email],(err,result)=>{
    if(err) return res.status(500).json({msg:"DB errror"});
    if(result.length) return res.status(400).json({msg:"email already exists"});
    db.query('insert into admin(name,email,password) values(?,?,?)',[name,email,password],(err,result)=>{
      (err2)=>{
        if(err2) return res.status(500).json({msg:"insert error"});
        res.json({msg:'register successfully'});
      };
    });
  });
};

exports.login=(req,res)=>{
  const{email,password}=req.body;
  if(!email||!password) return res.status(400).json({msg:"all fiels are required"});

 db.query('SELECT * FROM admin WHERE email = ? AND password = ?', [email, password], (err, result) => {
    if (err) return res.status(500).json({ msg: 'DB error' });
    if (!result.length) return res.status(401).json({ msg: 'Invalid credentials' });
    res.json({ msg: 'Login successful' });
  });
};











exports.register = (req, res) => {
  console.log('Register API hit:', req.body);
  res.json({ msg: 'Register successful' });
};

exports.login = (req, res) => {
  console.log("Login API hit:", req.body); 
  res.json({ msg: 'Login successful' });
};
