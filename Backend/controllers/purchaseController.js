const db=require('../config/db');

//add purchase

exports.createPurchase = (req, res) => {
  const { purchaseDate, supplierId, items, totalAmount, paymentMode, gstInvoice } = req.body;

  if (!purchaseDate || !supplierId || !items || !totalAmount || !paymentMode || !gstInvoice) {
    return res.status(400).json({ msg: 'All fields are required' });
  }

  const sql = 'INSERT INTO purchase (purchaseDate, supplierId, items, totalAmount, paymentMode, gstInvoice) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(sql, [purchaseDate, supplierId, JSON.stringify(items), totalAmount, paymentMode, gstInvoice], (err, result) => {
    if (err) return res.status(500).json({ msg: 'Database error', error: err });
    res.json({ msg: 'Purchase added successfully', purchaseId: result.insertId });
  });
};

//get All purchase 

exports.getAllPurchase =(req,res)=>{
  db.query(' select * from purchase',(err,result)=>{
    if(err) return res.status(500).json({msg:'databse error',error:err});
    res.json(result);
    
  });
};

//get purchase by id

exports.getPurchaseById = (req,res)=>{
  const id = req.params.id;
  db.query('select * from purchase where purchaseId =?',[id],(err,result)=>{
    if(err) return res.status(500).json({msg:'databse error',error:err});
    if(result.length===0) return res.status(404).json({msg:'purchase not found'});
    res.json(result[0]);
  });
};

//update purchase
exports.updatePurchase = (req, res) => {
  const id = req.params.id;
  const {purchaseDate,supplierId,items,totalAmount,paymentMode,gstInvoice
  } = req.body;

  if (!purchaseDate || !supplierId || !items || !totalAmount || !paymentMode || !gstInvoice) {
    return res.status(400).json({ msg: 'All fields are required' });
  }

  const sql = `
    UPDATE purchase 
    SET purchaseDate=?, supplierId=?, items=?, totalAmount=?, paymentMode=?, gstInvoice=? 
    WHERE purchaseId=?
  `;

  db.query(
    sql,
    [purchaseDate, supplierId, JSON.stringify(items), totalAmount, paymentMode, gstInvoice, id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ msg: 'Database error', error: err });
      }

      res.json({ msg: 'Purchase updated successfully' });
    }
  );
};

//delete  purchasee

exports.deletePurchase=(req,res)=>{
const id= req.params.id;
db.query('delete from purchase where purchaseId=?',[id], (err,result)=>{
if(err) return res.status(500).json({msg:'databse error',error:err});
res.json ({msg:"purchase deleted successfully"});
});
};


//search by invc numbber

exports.searchInvoice=(req,res)=>{
  const invoice = req.params.invoice;
  db.query('select * from purchase where gstInvoice = ?', [invoice],(err,result)=>{
    if(err) return res.status(500).json({msg:'databse error',error:err});
    if(result.length===0) return res.status(404).json({msg:'not match invoice found'});
    res.json(result);
  })
}