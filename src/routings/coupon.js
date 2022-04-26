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

router.put('/:id/use', async(req, res)=> {
    
    const coupon = await CouponModel.findById(req.params.id)

  if (coupon) {
    coupon.isUsed = "yes"

    const updatedCoupon = await coupon.save()

    res.json(updatedCoupon)
    console.log(updatedCoupon);

        res.send("coupon used.");
  } else {
    res.status(404)
    throw new Error('Coupon not found')
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