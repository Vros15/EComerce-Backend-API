const express = require("express");
const router = express.Router();
const {createCustomer, getAllCustomers} = require("../controllers/customerController");

// Route to create a new customer
//endpoint: POST /api/customers
router.post("/", createCustomer);

// Route to get all customers
//endpoint: GET /api/customers
router.get("/", getAllCustomers);

module.exports = router;

