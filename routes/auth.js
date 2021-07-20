const express = require("express");
const router = express.Router();

const Authenticate = require("../controllers/auth");
const { userSignupValidator } = require("../validator");

router.route("/signup").post(userSignupValidator, Authenticate.signup);
router.route("/signin").post(Authenticate.signin);
router.route("/signout").get(Authenticate.signout);

module.exports = router;
