const express = require("express");
const router = express.Router();
const OrderModel = require("../models/Order");

const orderController = require("../controllers/order")

router.get("/", orderController.fetchOrders)
router.post("/add-order-info", orderController.addOrderInfo)
router.put('/:id/deliver', orderController.updateOrderToDelivered)

router.get('/readOrder', async(req, res)=> {
    OrderModel.find({}, (err, result)=>{
        if(err){
            res.send(err)
        }
        res.send(result);
    })
});

module.exports = router;