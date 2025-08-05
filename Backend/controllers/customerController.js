const { ResultWithContextImpl } = require('express-validator/lib/chain');
const db = require ('../config/db');

//add new  customer

exports.createCustomer = (req,res)=>{
    const {cName,email,phone,address,gstNumber,contactDate}= req.body;


    if(!cName || !email || !phone || !address ||!gstNumber){
        return res.status(400).json({msg:'all fields are required'});

    }

     db.query(
    'INSERT INTO customer (cName, email, phone, address, gstNumber, contactDate) VALUES (?, ?, ?, ?, ?, ?)',
    [cName, email, phone, address, gstNumber, contactDate],
    (err,result)=>{
        if(err) return  res.status(500).json({msg:'insert error',error:err});
        res.json({id:result.insertId,msg:'customer added successfully'});
    }
);
};


exports.getAllCustomer=(req,res)=>{
    db.query('select*from customer',(err,rows)=>{
        if(err) return res.status(500).json({msg:'fetch error',error:err});
        res.json(rows);
    });
};

//get customer by id

exports.getAllCustomerById=(req,res)=>{
    const id=req.params.id;
    db.query('select * from customer where customerId = ?',[id],(err,rows)=>{
        if(err) return res.status(500).json({msg:'fetch error',error:err});
        if(!rows.length) return res.status(404).json({msg:'Customer not found'});
        res.json(rows[0]);
    });
};

//update customer by id


exports.updateCustomer = (req, res) => {
  const id = req.params.id;
  const { cName, email, phone, address, gstNumber, contactDate } = req.body;

  db.query(
    'UPDATE customer SET cName = ?, email = ?, phone = ?, address = ?, gstNumber = ?, contactDate = ? WHERE customerId = ?',
    [cName, email, phone, address, gstNumber, contactDate, id],
    (err, result) => {
      if (err) return res.status(500).json({ msg: 'Update error', error: err });
      res.json({ msg: 'Customer updated successfully' });
    }
  );
};


//delete customer by id

exports.deleteCustomer=(req,res)=>{
    const id=req.paramsid;
    db.query('delete from customer where customerId=?',[id],(err,result)=>{
        if(err) return res.status(500).json({msg:'Delete error ',error:err});
      res.json({msg:'customer deleted successfully'});  
    });
};


//search customer

exports.searchCustomerByName = (req,res)=>{
    const name =req.query.name;

    if(!name) return res.status(400).json({msg:'customer name required'});

    db.query('select * from customer where cName like ?',[`%${name}%`], (err,rows)=>{
        if(err) return res.status(500).json({msg:'search error',error:err});
        res.json(rows);
    })
}





