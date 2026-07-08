// controllers/customerController.js
const Customer = require("../models/Customer");

const createCustomer = async (req, res) => {
    try {
        const { name, email, address, phone } = req.body;
        const newCustomer = await Customer.create({ name, email, address, phone });
        res.status(201).json({ message: "Customer created successfully", customer: newCustomer });
    } catch (error) {
        res.status(500).json({ message: "Error creating customer", error });
    }
};

const getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.find();
        res.status(200).json({ customers });
    } catch (error) {
        res.status(500).json({ message: "Error fetching customers", error });
    }
};

module.exports = {
    createCustomer,
    getAllCustomers,
};