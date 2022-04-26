const CouponModel = require("../models/Coupon");
const express = require("express");
const router = express.Router();
 


//CREATE

router.post('/addCoupon', async(req, res)=> {
    const type = req.body.type;
    const code = req.body.code;
    const value = req.body.value;
    console.log("req.body: ", req.body);

    const coupon = new CouponModel({type: type, code: code, value: value});

    try {
        await coupon.save();
        console.log("coupon saved, Ela.");
        console.log(coupon);

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

router.post('/getCoupon', async(req, res)=> {
    CouponModel.find(
        {//type : req.body.type,
        //value : req.body.value,
        code:req.body.code
    }, (err, result)=>{
        if(err){
            res.send(err)
        }
        res.send(result);
    })
});

//DELETE

router.get('/deleteCoupon/:code', async(req, res)=> {
    const code = req.params.code;
    //res.send(id);
    await CouponModel.findOneAndDelete({code:code}).exec();
    res.send('deleted by code.')

});

module.exports = router;