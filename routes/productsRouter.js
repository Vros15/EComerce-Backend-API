const express = require('express');
const router = express.Router();
const { createProduct,getAllProducts, getProductById, updateProductById,deleteProductById } = require('../controllers/productsController');

// Route to create a new product
//endpoint: POST /api/products
router.post("/", createProduct);

// Route to get all products
//endpoint: GET /api/products
router.get("/", getAllProducts);

// Route to get a product by ID
//endpoint: GET /api/products/:id
router.get("/:id", getProductById);

// Route to update a product by ID
//endpoint: PUT /api/products/:id
router.put("/:id", updateProductById);

// Route to delete a product by ID
//endpoint: DELETE /api/products/:id
router.delete("/:id", deleteProductById);

module.exports = router;
