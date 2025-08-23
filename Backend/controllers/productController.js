const db = require('../config/db');
//add product
exports.addProduct = (req, res) => {
  const { productName, categoryID } = req.body;

  if (!productName) 
    return res.status(400).json({ msg: 'Product name required' });

  const createdDate = new Date().toISOString().split('T')[0]; 

  // If categoryID is given, check if it exists
  if (categoryID) {
    db.query('SELECT categoryID FROM product_category WHERE categoryID = ?', [categoryID], (err, rows) => {
      if (err) return res.status(500).json({ msg: 'Category check error' });
      if (!rows.length) return res.status(400).json({ msg: 'Invalid categoryID' });

      insertProduct(productName, createdDate, categoryID, res);
    });
  } else {
    insertProduct(productName, createdDate, null, res);
  }
};

function insertProduct(productName, createdDate, categoryID, res) {
  db.query(
    'INSERT INTO product (productName, createdDate, categoryID) VALUES (?, ?, ?)',
    [productName, createdDate, categoryID],
    (err, result) => {
      if (err) {
        console.log('Insert error', err);
        return res.status(500).json({ msg: 'Insert error', error: err });
      }
      res.json({ id: result.insertId, msg: 'Product added successfully' });
    }
  );
}




//view all products


exports.getAllProducts =(req,res)=>{
    db.query('select * from product',(err,rows)=>{
        if(err) return res.status(500).json({msg:'fetch error'});
        res.json({rows});
    });
};


//get product by id

exports.getProductById = (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM product WHERE productId = ?', [id], (err, rows) => {
    if (err) return res.status(500).json({ msg: 'Fetch error' });
    if (!rows.length) return res.status(404).json({ msg: 'Not found' });
    res.json(rows[0]);
  });
};


//update product by id

exports.updateProduct = (req, res) => {
  const id = req.params.id;
  const { productName, categoryID } = req.body;
  db.query(
    'UPDATE product SET productName = ?, categoryID = ? WHERE productId = ?',
    [productName, categoryID, id],
    (err, result) => {
      if (err) {
        console.error('Update error:', err);  
        return res.status(500).json({ msg: 'Update error' });
      }
      res.json({ msg: 'Product updated' });
    }
  );
};

//delete product

exports.deleteProduct=(req,res)=>{
  const id=req.params.id;
  db.query('delete from product where productId=?',[id],(err)=>{
    if(err) return res.status(500).json({msg:'delete error'});
    res.json({msg:'product deleted successfully'});
  });

};


//search product by name

exports.searchProductByName = (req, res) => {
  const name = req.query.name;
  if (!name) return res.status(400).json({ msg: 'product name required' });

  db.query(
    'SELECT * FROM product WHERE productName LIKE ?', 
    [`%${name}%`],
    (err, rows) => {
      if (err) return res.status(500).json({ msg: 'search error', error: err });
      res.json(rows);
    }
  );
};

