const express= require('express');
const router = express.Router();
const {check, validationResult} = require ('express-validator');
const { restart } = require('nodemon');   
const {Donation} = require('../models/Donation');
//@route POST api/donation

//@access public
router.post ("/new", async (req,res) => {
    try {
        // Upload image to cloudinary
         
         var donation=new Donation(
        {
            title:req.body.title,
            user:req.body.user, 

        }
    ) 
        console.log(req.body);
        //event.donations.push(donation);
        await donation.save();
        res.json(donation);
        res.send("donation added");

    }catch(err){
        res.send(err);

    }
});

router.get('/', (req, res) => {
    Donation.find().exec((err , donations) => {
        if (err) return res.status(400).json({success: false , err});
        return res.status(200).json({success: true, donations: donations});
    });
});

router.put('/update/:id', (req, res) => {
    Donation.findByIdAndUpdate(
req.params.id,
{
    $set: req.body,
},
    (err, donation) => {
        if (err) return res.status(400).json({success: false , err});
        return res.status(200).json({success: true});
    }
    );
});

router.delete('/delete/:id', (req, res) => {
    Event.findByIdAndRemove(
req.params.id).exec((err, deleteEvent) => {
    if (err) {
        res.send(err)
    }
}) 
        return res.json(deleteEvent);
    });


 module.exports = router;