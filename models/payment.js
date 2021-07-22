const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const paymentSchema = new mongoose.Schema({
    amountFromTheClient: Number,
    userId : { type: ObjectId, ref: "User" },
    paymentMadeBy: String,
    },{ timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);