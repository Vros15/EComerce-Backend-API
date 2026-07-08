const express = require('express');
const router = express.Router();
const { createProduct } = require('../controllers/productsController');

// Route to create a new product
//endpoint: POST /api/products
router.post("/", createProduct);

module.exports = router;
