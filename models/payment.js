const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    amout: Number,
    paymentMethodNonce : String,
    options: Boolean
    },{ timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);