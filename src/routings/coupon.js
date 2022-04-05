const CouponModel = require("../models/Coupon");
const express = require("express");
const router = express.Router();
 


//CREATE

router.post('/addCoupon', async(req, res)=> {
    const type = req.body.type;
    const code = req.body.code;
    const value = req.body.value;

    const coupon = new CouponModel({type: type, code: code, value});

    try {
        await coupon.save();
        console.log("coupon saved, Ela.");
        res.send("coupon saved.");
    }catch(err) {
        console.log(err)
    }

});

//GET ALL

router.get('/readCoupon', async(req, res)=> {
    CouponModel.find({}, (err, result)=>{
        if(err){
            res.send(err)
        }
        res.send(result);
    })
});
//UPDATE

router.put('/updateCoupon', async(req, res)=> {
    
    const value = req.body.value;
    const id = req.body.id;
    try {
        await CouponModel.findById(id, (err, updatedCoupon)=>{
            updatedCoupon.value = value;
            updatedCoupon.save();
        });
        console.log("coupon edited, Ela.");
        res.send("coupon edited.");
    }catch(err) {
        console.log(err)
    }

});

//DELETE

router.delete('/deleteCoupon/:id', async(req, res)=> {
    const id = req.params.id;
    //res.send(id);
    await CouponModel.findByIdAndRemove(id).exec();
    res.send('deleted.')

});

module.exports = router;