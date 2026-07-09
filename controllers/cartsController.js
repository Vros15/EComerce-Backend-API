const Cart = require("../models/Cart");

const createOneCart = async (req, res) => {
    try {
        const { customer, products } = req.body;

        // Check if this customer already has a cart
        const existingCart = await Cart.findOne({ customer });

        if (existingCart) {
            return res.status(400).json({
                message: "Customer already has a shopping cart."
            });
        }

        // Create the cart
        const newCart = await Cart.create({
            customer,
            products
        });

        res.status(201).json({
            message: "Cart created successfully.",
            cart: newCart
        });

    } catch (error) {
        res.status(500).json({
            message: "Error creating cart.",
            error: error.message
        });
    }
};

module.exports = {
    createOneCart
};