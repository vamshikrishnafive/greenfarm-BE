const express = require("express");
const router  = express.Router();

const { requireSignin, isAuth, isAdmin } = require("../middleware/Auth.middleware");
const { userById, addOrderToUserHistory } = require("../controllers/user");
const Orderdetails = require("../controllers/order");
const Productdetails = require("../controllers/product");

router.route("/order/create/:userId").post(requireSignin,isAuth,addOrderToUserHistory,Productdetails.decreaseQuantity,Orderdetails.create);
router.route("/order/list/:userId").get(requireSignin, isAuth, isAdmin, Orderdetails.listOrders);
router.route("/order/status-values/:userId").get(requireSignin,isAuth,isAdmin,Orderdetails.getStatusValues);
router.route("/order/:orderId/status/:userId").put(requireSignin,isAuth,isAdmin,Orderdetails.updateOrderStatus);
router.param("userId", userById);
router.param("orderId", Orderdetails.orderById);

module.exports = router.route ;
