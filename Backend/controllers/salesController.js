const { Result } = require('express-validator');
const db= require('../config/db');
const { json } = require('express/lib/response');

exports.createSale=(req,res)=>{
    const {invoiceNo,salesDate,customerId,items,totalAmount,paymentMode,gstInvoice} = req.body;

if(!invoiceNo || !salesDate || !customerId || !items || !totalAmount || !paymentMode || !gstInvoice){
    return res.status(400).json({msg:'all fields are required'});
}


const itemsJson = JSON.stringify(items);
//convert to json string


const sql = `insert into sales(invoiceNo,salesDate,customerId,items,totalAmount,paymentMode,gstInvoice) values(?,?,?,?,?,?,?)`;

db.query(sql,[invoiceNo,salesDate,customerId,itemsJson,totalAmount,paymentMode,gstInvoice],(err,Result)=>{
    if(err){
        console.error("database error:",err);
        return res.status(500).json({msg:'databse error',error:err});
    }
    res.status(201).json({msg:'sale record added',saleId:Result.insertId});
});
};

//get all sales
exports.getAllSales=(req,res)=>{
    db.query('select*from sales',(err,results)=>{
        if(err) return res.status(500).json({msg:'database error',error:err});
        res.json(results);
    });
};


//get sales by id

exports.getSaleById=(req,res)=>{
const id=req.params.id;
db.query('select* from sales where id=?',[id],(err,result)=>{
    if(err)return res.status(500).json({msg:'database error',error:err});
    if(result.length===0) return res.status(404).json({msg:'sales not found'});
    res.json(result[0]);
});
};


//update sales by

exports.updateSale = (req,res)=>{
    const id = req.params.id;

    const{invoiceNo,salesDate,customerId,items,totalAmount,paymentMode,gstInvoice} = req.body;

    if(!invoiceNo || !salesDate || !customerId || !items || !totalAmount || !paymentMode ||!gstInvoice){

   return res.status(400).json ({msg:'all fields are required'});
    };

    const itemsJson = JSON.stringify(items);

    const sql = `update sales set invoiceNo=?,salesDate=?,customerId=?,items=?,totalAmount=?,paymentMode=?,gstInvoice=? where id=?`;
    db.query(sql,[invoiceNo,salesDate,customerId,itemsJson,totalAmount,paymentMode,gstInvoice,id],(err,result)=>{
        if(err) return res.status(500).json({msg:'databse error',error:err});
        if(result.affectedRows===0) return res.status(404).json({msg:'sale not found'});
        res.json({msg:'sale updated successfully'});

    });
};
//delete  sell by  
exports.deleteSale = (req,res)=>{

    const id= req.params.id;

    db.query('delete from sales where id =?',[id],(err,result)=>{
        if(err) return res.status(500).json({msg:'databse error',error:err});
        if(result.affectedrows === 0) return res.status(404).json({msg:'sale not found'});
        res.json({msg:'sale deleted successfully'});
    });
};

//sales search 

exports.searchSaleByInvoice=(req,res)=>{
    const invoice = req.params.invoice;

    if(!invoice){

return res.status(400).json({msg:'invoice number required'});

    }

    const sql = 'select * from  sales where invoiceNo like ?';

    db.query(sql,[`%${invoice}%`],(err,rows)=>{
        if(err){
            return res.status(500).json({msg:'databse error',error:err});
        }
        res.json(rows);
    })
}