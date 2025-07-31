// const db=require('../config/db');





// //add
// exports.createCategory=(req,res)=>{
//   const{ name } =req.body;

//   if(!name) return res.status(400).json({msg:'Name required'});

//   db.query('select * from product_category where name = ?',[name],(err,rows)=>{
//     if(rows.length) return res.status(400).json({msg:'category already exists'});

//     db.query('insert into product_category (name) values(?)',[name],(err2,result)=>{
//       if(rows.length) return res.status(500).json({msg:"insert error"});
//       res.json({id:result.insertId, msg:'category added'});

      
//     });
//   });
// };

// //view

// exports.getAllcategories =(req,res)=>{

//   db.query('select * from product_category',(err,rows)=>{
//     if(err) return res.status(500).json({msg:'fetch error'});
//     res.json(rows);
//   });
// };

// //getcategory by id


// exports.getcategoryByID = (req,res)=>{
//   const id = req.params.id;
//   db.query('select*from product_category where id = ?',[id],(err,rows)=>{
//     if(err) return res.status(500).json({msg:"not found"});
//     if(!rows.length) return res.status(404).json({msg:"not found"});
//     res.json(rows[0]);
//   });

// };

// //update category
// exports.updateCategory =(req,res)=>{
//   const id =req.params.id;
//   const{ name }= req.body;
//   db.query('update product_category set name = ? where id= ?',[name,id],(err,result)=>{
//     if(err) return res.status(500).json({msg:'update error'});
//     res.json({msg:'category updated'});

//   });
// };


// //delete category


// exports.deleteCategory =(req,res)=>{
//   const id = req.params.id;
//   db.query('delet from product_category where id=?',[id],(err)=>{
//     if(err) return res.status(500).json({msg:'delete error'});
//     res.json({msg:'category deleted'});
//   });
// };



// //search catgory by name
// exports.searchCategoryByName=(req,res)=>{
//   const name=req.query.name;
//   db.query('select*from product_category where name like ?',[`%${name}%`],(err,rows)=>{
//     if(err) return res.status(500).json({msg:"search error"});
//     res.json(rows);
//   });
// };




const db = require('../config/db'); 

exports.createCategory = (req, res) => {
  const { categoryName } = req.body;     
  if (!categoryName) return res.status(400).json({ msg: 'Name required' });

  db.query('SELECT * FROM product_category WHERE categoryName = ?', [categoryName], (err, rows) => {
    if (err) return res.status(500).json({ msg: 'Query error' });
    if (rows.length) return res.status(400).json({ msg: 'Category already exists' });

    db.query('INSERT INTO product_category (categoryName) VALUES (?)', [categoryName], (err2, result) => {
      if (err2) return res.status(500).json({ msg: 'Insert error' });
      res.json({ id: result.insertId, msg: 'Category added' });
    });
  });
};




exports.getAllCategories = (req, res) => {
  db.query('SELECT * FROM product_category', (err, rows) => {
    if (err) return res.status(500).json({ msg: 'Fetch error' });
    res.json(rows);
  });
};

exports.getCategoryById = (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM product_category WHERE categoryID = ?', [id], (err, rows) => {
    if (err) return res.status(500).json({ msg: 'Fetch error' });
    if (!rows.length) return res.status(404).json({ msg: 'Not found' });
    res.json(rows[0]);
  });
};


//update category

exports.updateCategory = (req, res) => {
  const id = req.params.id;
  const { name } = req.body;
  db.query('UPDATE product_category SET categoryName = ? WHERE categoryID = ?', [name, id], (err, result) => {
    if (err) return res.status(500).json({ msg: 'Update error' });
    res.json({ msg: 'Category updated' });
  });
};

//delet category


exports.deleteCategory = (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM product_category WHERE categoryID = ?', [id], (err) => {
    if (err) return res.status(500).json({ msg: 'Delete error' });
    res.json({ msg: 'Category deleted' });
  });
};

//search by name


// exports.searchCategoryByName = (req, res) => {
//   const name = req.query.name;
//   if (!name) return res.status(400).json({ msg: 'Name query required' });

//   db.query('SELECT * FROM product_category WHERE categoryName LIKE ?', [`%${name}%`], (err, rows) => {
//     if (err) return res.status(500).json({ msg: 'Search error', error: err });
//     res.json(rows);
//   });
// };



//search by name this code not run ...i solve this problem sum time


exports.searchCategoryByName = (req, res) => {
  const name = req.query.name;
  console.log('Received name query:', name);
  
  if (!name) return res.status(400).json({ msg: 'Name query required' });

  db.query('SELECT * FROM product_category WHERE categoryName LIKE ?', [`%${name}%`], (err, rows) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ msg: 'Search error', error: err });
    }
    console.log('Query result:', rows);
    res.json(rows);
  });
};

