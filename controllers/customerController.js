// controllers/customerController.js
const Customer = require("../models/Customer");
const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");

const createCustomer = asyncHandler(async (req, res) => {
    const { name, email, address, phone } = req.body;
    const newCustomer = await Customer.create({ name, email, address, phone });
    res.status(201).json({ message: "Customer created successfully", customer: newCustomer });
});

const getAllCustomers = asyncHandler(async (req, res) => {
    const customers = await Customer.find();
    res.status(200).json({ customers });
});

const getCustomerById = asyncHandler(async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
        throw new AppError("Customer not found.", 404, "CUSTOMER_NOT_FOUND");
    }
    res.status(200).json({ message: "Customer retrieved successfully.", customer });
});

const updateCustomer = asyncHandler(async (req, res) => {
    const { name, email, address, phone } = req.body;
    const updatedCustomer = await Customer.findByIdAndUpdate(
        req.params.id,
        { name, email, address, phone },
        { new: true }
    );
    if (!updatedCustomer) {
        throw new AppError("Customer not found.", 404, "CUSTOMER_NOT_FOUND");
    }
    res.status(200).json({ message: "Customer updated successfully.", customer: updatedCustomer });
});

const deleteCustomer = asyncHandler(async (req, res) => {
    const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);
    if (!deletedCustomer) {
        throw new AppError("Customer not found.", 404, "CUSTOMER_NOT_FOUND");
    }
    res.status(200).json({ message: "Customer deleted successfully.", customer: deletedCustomer });
});

module.exports = {
    createCustomer,
    getAllCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer,
};