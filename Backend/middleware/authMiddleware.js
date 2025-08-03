const jwt = require('jsonwebtoken');

exports.verifyToken=(req,res,next)=>{
  const token=req.headers.authorization?.split('')[1];

  if(!token) return res.status(401).json({msg:'no token provided'});
  
jwt.verify(token,process.env.JWT_SECRET,(err,decode)=>{
if(err) return res.status(401).json({msg:'nvalid token'});
req.user=decode;//save user data in request
next();
});
};

exports.isAdmin=(req,res,next)=>{
  if(req.user && req.user.role=== 'admin'){

  next();
  }else{
    res.status(403).json({msg:'admin access requires'});
  }
};