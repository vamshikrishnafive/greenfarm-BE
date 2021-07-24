const express = require("express");
const router  = express.Router();

const { requireSignin, isAuth, isFarmer } = require("../middleware/Auth.middleware");
const Userdetails = require("../controllers/user");
const Orderdetails = require("../controllers/order");
const Productdetails = require("../controllers/product");

router.route("/order/create/:userId").post(requireSignin,isAuth,Userdetails.addOrderToUserHistory,Productdetails.decreaseQuantity,Orderdetails.create);
router.route("/order/list/:userId").get(requireSignin, isAuth, isFarmer, Orderdetails.listOrders);
router.route("/order/status-values/:userId").get(requireSignin,isAuth,isFarmer,Orderdetails.getStatusValues);
router.route("/order/:orderId/status/:userId").put(requireSignin,isAuth,isFarmer,Orderdetails.updateOrderStatus);
router.param("userId", Userdetails.userById);
router.param("orderId", Orderdetails.orderById);

module.exports = router.route ;
