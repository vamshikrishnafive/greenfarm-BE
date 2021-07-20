const express = require("express");
const router = express.Router();

const  Productdetails = require("../controllers/product");
const { requireSignin, isAuth, isAdmin } = require("../middleware/Auth.middleware");
const Userdetails  = require("../controllers/user");

router.route("/product/:productId").get(Productdetails.read);
router.route("/product/create/:userId").post(requireSignin, isAuth, isAdmin, Productdetails.create);
router.route("/product/:productId/:userId").delete(requireSignin,isAuth,isAdmin,Productdetails.remove);
router.route("/product/:productId/:userId").put(requireSignin,isAuth,isAdmin,Productdetails.update);
router.route("/products").get(Productdetails.list);
router.route("/products/search").get(Productdetails.listSearch);
router.route("/products/related/:productId").get(Productdetails.listRelated);
router.route("/products/categories").get(Productdetails.listCategories);
router.route("/products/by/search").post(Productdetails.listBySearch);
router.route("/product/photo/:productId").get(Productdetails.photo);

router.param("userId", Userdetails.userById);
router.param("productId", Productdetails.productById);

module.exports = router;
