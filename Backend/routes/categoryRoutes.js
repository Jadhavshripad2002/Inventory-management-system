const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.post('/add', categoryController.createCategory);
router.get('/view', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);
router.put('/update/:id', categoryController.updateCategory);
router.delete('/delete/:id', categoryController.deleteCategory);
router.get('/search-category', categoryController.searchCategoryByName);

module.exports = router;

