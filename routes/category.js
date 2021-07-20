const express = require("express");
const router = express.Router();

const Categorydetails = require("../controllers/category");
const { requireSignin, isAuth, isAdmin } = require("../middleware/Auth.middleware");
const { userById } = require("../controllers/user");

router.route("/category/:categoryId").get(Categorydetails.read);
router.route("/category/create/:userId").post(requireSignin, isAuth, isAdmin, Categorydetails.create);
router.route("/category/:categoryId/:userId").put(requireSignin,isAuth,isAdmin,Categorydetails.update);
router.route("/category/:categoryId/:userId").delete(requireSignin,isAuth,isAdmin,Categorydetails.remove);
router.route("/categories").get(Categorydetails.list);
router.param("categoryId", Categorydetails.categoryById);
router.param("userId", userById);

module.exports = router;
