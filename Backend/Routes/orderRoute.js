const express = require("express");
const router = express.Router();
const orderController = require("../Controllers/orderController");


router.get("/orders", orderController.getOrders);
router.post("/orders", orderController.createOrder);
router.patch("/orders/:orderId/status", orderController.updateOrderStatus);
router.get("/orders/id/:orderId", orderController.getOrderById);

module.exports = router;
