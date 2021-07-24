const express = require("express");
const router = express.Router();

const Categorydetails = require("../controllers/category");
const { requireSignin, isAuth, isFarmer } = require("../middleware/Auth.middleware");
const { userById } = require("../controllers/user");

router.route("/category/:categoryId").get(Categorydetails.read);
router.route("/category/create/:userId").post(requireSignin, isAuth, isFarmer, Categorydetails.create);
router.route("/category/:categoryId/:userId").put(requireSignin,isAuth,isFarmer,Categorydetails.update);
router.route("/category/:categoryId/:userId").delete(requireSignin,isAuth,isFarmer,Categorydetails.remove);
router.route("/categories").get(Categorydetails.list);
router.param("categoryId", Categorydetails.categoryById);
router.param("userId", userById);

module.exports = router;
