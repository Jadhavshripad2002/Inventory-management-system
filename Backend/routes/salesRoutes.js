let express = require('express');
let router = express.Router();
let salesController = require('../controllers/salesController');
let authMiddleware = require('../middleware/authMiddleware');


router.post('/add',salesController.createSale);

router.get('/view',salesController.getAllSales);

router.get('/:id',salesController.getSaleById);

router.put('/update/:id',salesController.updateSale);


router.delete('/delete/:id',salesController.deleteSale);


router.get('/searchSaleByInvoice/:invoice', salesController.searchSaleByInvoice);



module.exports = router;
