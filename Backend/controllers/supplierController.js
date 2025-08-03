const db = require('../config/db');


//add all supplier
exports.createSupplier=(req,res)=>{
    const{sName,contactDate,phone,compName,email,address,gstNumber} = req.body;
    if(!sName || !contactDate || !phone || !compName || !email || !address || !gstNumber){

    }
    db.query('insert into supplier (sName,contactDate,phone,companyName,email,address,gstNumber) values(?,?,?,?,?,?,?)',[sName,contactDate,phone,compName,email,address,gstNumber],(err,result)=>{
        if(err) return res.status(500).json({msg:'insert error',error:err});
        res.json({id:result.insertId, msg:'supplier added successfully'});
        }
    );
    
}

// view all supplier

exports.getAllSupplier=(req,res)=>{
    db.query('select * from supplier',(err,rows)=>{
        if(err) return res.status(500).json({msg:'fetch error',errro:err});
        res.json(rows);
    });
};

//get supplier by id

exports.getSupplierById = (req,res)=>{
    const id = req.params.id;
    db.query('select *from supplier where supplierId = ?',[id],(err,rows)=>{
        if(err) return res.status(500).json({msg:'fetch error',error:err});
        if(!rows.length) return res.status(500).json({msg:'supplier not found'});
        res.json(rows[0]);
    });
};


//update supplier by  id

exports.updateSupplier = (req, res) => {
  const id = req.params.id;
  const { sName, contactDate, phone, companyName, email, address, gstNumber } = req.body;
  if (!sName || !contactDate || !phone || !companyName || !email || !address || !gstNumber) {
    return res.status(400).json({ msg: 'All fields are required' });
  }

  db.query(
    'UPDATE supplier SET sName=?, email=?, phone=?, companyName=?, address=?, gstNumber=?, contactDate=? WHERE supplierId=?',
    [sName, email, phone, companyName, address, gstNumber, contactDate, id],
    (err, result) => {
      if (err) return res.status(500).json({ msg: 'update error', error: err });
      res.json({ msg: 'supplier updated successfully' });
    }
  );
};


//delete supplier by id

exports.deleteSupplier =(req,res)=>{
    const id =req.params.id;
    db.query('delete from supplier where supplierId=?',[id],(err,result)=>{
        if(err) return res.status(500).json({msg:'delete error',error:err});
        res.json({msg:'supplier deleted successfully'});
    });

};



//supplier code work prooper i solve evening

exports.searchSupplierByName = (req, res) => {
  const name = req.query.name;
  if (!name) return res.status(400).json({ msg: 'product name required' });

  db.query(
    'SELECT * FROM supplier WHERE sName LIKE ?', 
    [`%${name}%`],
    (err, rows) => {
      if (err) return res.status(500).json({ msg: 'search error', error: err });
      res.json(rows);
    }
  );
};