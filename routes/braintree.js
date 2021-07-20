const express = require("express");
const router = express.Router();

const { requireSignin, isAuth } = require("../middleware/Auth.middleware");
const { userById } = require("../controllers/user");
const PaymentProvider = require("../controllers/braintree");

router.route("/braintree/getToken/:userId").get(requireSignin, isAuth, PaymentProvider.generateToken);
router.route("/braintree/payment/:userId").post(requireSignin,isAuth,PaymentProvider.processPayment);
router.param("userId", userById);

module.exports = router;
