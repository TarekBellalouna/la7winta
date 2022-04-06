const express = require("express");
const router = express.Router();

const orderController = require("../controllers/order")

router.get("/", orderController.fetchOrders)
router.post("/add-order-info", orderController.addOrderInfo)
router.put('/:id/deliver', orderController.updateOrderToDelivered)

module.exports = router;