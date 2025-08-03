
const db = require('../config/db'); 

exports.createCategory = (req, res) => {
  const { categoryName } = req.body; 
  const createDate = new Date();    
  if (!categoryName) return res.status(400).json({ msg: 'Name required' });

  db.query('SELECT * FROM product_category WHERE categoryName = ?', [categoryName], (err, rows) => {
    if (err) return res.status(500).json({ msg: 'Query error' });
    if (rows.length) return res.status(400).json({ msg: 'Category already exists' });

    db.query('INSERT INTO product_category(categoryName,createdDate) VALUES (?,?)', [categoryName,createDate], (err2, result) => {
      if (err2) return res.status(500).json({ msg: 'Insert error' });
      res.json({ id: result.insertId, msg: 'Category added' });
    });
  });
};



//view all category
exports.getAllCategories = (req, res) => {
  db.query('SELECT * FROM product_category', (err, rows) => {
    if (err) return res.status(500).json({ msg: 'Fetch error' });
    res.json(rows);
  });
};

//get category with id

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


exports.searchCategoryByName = (req, res) => {
  const name = req.query.name;
  if (!name) return res.status(400).json({ msg: 'Name query required' });

  db.query('SELECT * FROM product_category WHERE categoryName LIKE ?', [`%${name}%`], (err, rows) => {
    if (err) return res.status(500).json({ msg: 'Search error', error: err });
    res.json(rows);
  });
};







