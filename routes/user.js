const express = require("express");
const router = express.Router();

const { requireSignin, isAuth, isAdmin } = require("../middleware/Auth.middleware");
const Userdetails = require("../controllers/user");

router.get("/secret/:userId", requireSignin, isAuth, isAdmin, (req, res) => {
    res.json({
        user: req.profile
    });
});

router.route("/user/:userId").get( requireSignin, isAuth, Userdetails.read);
router.route("/user/:userId").put(requireSignin, isAuth, Userdetails.update);
router.route("/orders/by/user/:userId").get(requireSignin, isAuth, Userdetails.purchaseHistory);
router.param("userId", Userdetails.userById);

module.exports = router;
