//import mongoose
const mongoose = require("mongoose");

//create a schema for the cart
const cartSchema = new mongoose.Schema({

    //customer reference to Customer model
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: true,
        unique: true,
    },
    //products (array of objects with productId (reference to Product) (required) and quantity (number)
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
        },
    ],
});

// Create a model based on the schema
const Cart = mongoose.model("Cart", cartSchema);

// Export the model
module.exports = Cart;