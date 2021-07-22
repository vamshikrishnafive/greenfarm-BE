const braintree = require("braintree");
const Payment = require("../models/payment");
require("dotenv").config();

const gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY
});

class PaymentProvider {
    static generateToken = (req, res) => {
        gateway.clientToken.generate({}, function (err, response) {
            if (err) { res.status(500).send(err) }
            else { res.send(response) }
        });
    };

    static async processPayment(req, res) {
        let nonceFromTheClient = req.body.paymentMethodNonce;
        let amountFromTheClient = req.body.amount;
        let userId = req.params.userId;
        await gateway.transaction.sale({
            amount: amountFromTheClient,
            paymentMethodNonce: nonceFromTheClient,
            options: { submitForSettlement: true }
        })
        await Payment.create({ paymentMethod: nonceFromTheClient, userId, amountFromTheClient })
            .then(response => res.status(200).json(response))
            .catch(error => res.status(400).json({ error: error.message }))
    };
    static async getPayments(req, res) {
        await Payment.find().populate("userId", "_id name")
            .then(respone => res.status(200).json({ result: respone }))
            .catch(error => res.status(400).json({ error: error.message }))
    }
}

module.exports = PaymentProvider;

