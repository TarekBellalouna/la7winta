const express= require('express');
const router = express.Router();
const {check, validationResult} = require ('express-validator');
const { restart } = require('nodemon');   
const {Donation} = require('../models/Donation');
const Events =require('../models/Event');
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");

//@route POST api/donation

//@access public


 
router.post ("/new",upload.single("image"),async (req,res) => { 
    console.log(req.file);
    const result = await cloudinary.uploader.upload(req.file.path);
        // Upload image to cloudinary
         
         var donation=new Donation(
        
         {   title:req.body.title,
            user:req.body.user, 
            event: req.body.event,
            avatar: result.secure_url,
            cloudinary_id: result.public_id}

        );
         console.log(req.body.event)
        let event = await  Events.findOne({_id:req.body.event})
        console.log(event);
        event.Donations.push(donation);
        let updatedevent  =event.save();
        console.log(updatedevent)
        await donation.save();
        res.send(donation);

  
});

router.get('/', (req, res) => {
    const searchValue = req.query.searchValue;
    Donation.find({title: new RegExp(`^${searchValue}`,"i")}).exec((err , donations) => {
        if (err) return res.status(400).json({success: false , err});
        return res.status(200).json({success: true, donations: donations});
    });
});

  


 module.exports = router;