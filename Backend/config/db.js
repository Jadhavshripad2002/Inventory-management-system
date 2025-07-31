const mysql = require('mysql2');
const db=mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'',
  database:'inventory_db'
});

db.connect((err)=>{
  if(err) throw err;
  console.log('mysql is connected...');
});
module.exports=db;


// const pool = mysql.createPool({
//   host:process.env.DB_HOST,
//   user:process.env.DB_USER,
//   password:process.env.DB_password,
//   database:process.env.DB_NAMe
// });
// module.exports=pool.promise();