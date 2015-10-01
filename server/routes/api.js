var express = require('express');
var router = express.Router();
var product_controller = require('../controllers/product.server.controller');
var category_controller = require('../controllers/category.server.controller');
var productCode_controller = require('../controllers/product-code.server.controller');
var credit_controller = require('../controllers/credit.server.controller');
var invoice_controller = require('../controllers/invoice.server.controller');
var register_controller = require('../controllers/register.server.controller');


// Get count products
router.get('/products', product_controller.count);

// Get range products
router.get('/products:page:limit?', product_controller.findByPage);

// Get one product
router.get('/products/:id', product_controller.findById);

// Create product
router.post('/products', product_controller.create);

// Update product
router.put('/products/:id', product_controller.update);

// Delete product
router.delete('/products/:id', product_controller.delete);

// Filter invoice
router.get('/products/state/:filterState', product_controller.findByState);

// Search by productName
router.get('/products/search/:productName', product_controller.findByName);

// Search by barcode
//router.get('/products/search:productCode', product_controller.findByName);

//////////////////////////////////////////////////////////////
//	Category

// Get all categories
router.get('/categories', category_controller.findAll);

// Get one category
router.get('/categories/:id', category_controller.findById);

// Create category
router.post('/categories', category_controller.create);

// Update category
router.put('/categories/:id', category_controller.update);

// Delete category
router.delete('/categories/:id', category_controller.delete);

//////////////////////////////////////////////////////////////
//	ProductCode

// Get all product-codes
router.get('/productcodes', productCode_controller.findAll);

// Get one category
router.get('/productcodes/:id', productCode_controller.findById);

// Create category
router.post('/productcodes', productCode_controller.create);

// Update category
router.put('/productcodes/:id', productCode_controller.update);

// Delete category
router.delete('/productcodes/:id', productCode_controller.delete);

//////////////////////////////////////////////////////////////
//	Credit

// Get all credits
router.get('/credits', credit_controller.findAll);

// Get one credit
router.get('/credits/:id', credit_controller.findOne);

// Create credit
router.post('/credits', credit_controller.create);

// Update credit
router.put('/credits/:id', credit_controller.update);

// Delete credit
router.delete('/credits/:id', credit_controller.delete);

//////////////////////////////////////////////////////////////
//	Invoice

// Get count products
router.get('/invoices', invoice_controller.count);

// Get range products
router.get('/invoices:page:limit?', invoice_controller.findByPage);

// Get one invoice
router.get('/invoices/:id', invoice_controller.findOne);

// Create invoice
router.post('/invoices', invoice_controller.create);

// Update invoice
router.put('/invoices/:id', invoice_controller.update);

// Delete invoice
router.delete('/invoices/:id', invoice_controller.delete);

// Search by client name
router.get('/invoices/search/:clientName', invoice_controller.findByName);

//////////////////////////////////////////////////////////////
//	Register

// Get count registers
router.get('/registers', register_controller.count);

// Get range registers
router.get('/registers:page:limit?', register_controller.findByPage);

// Create register
router.post('/registers', register_controller.create);

module.exports = router;