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
<<<<<<< Updated upstream:Client/src/routings/donation.js
router.post('/', (req, res) => {
    const donation = new Donation (req.body);
    donation.save( (err) => {
        if (err) return res.status(400).json({success: false , err});
        return res.status(200).json({success: true});
    });
=======
router.post ("/new",upload.single("image"),async (req,res) => { 
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

  
>>>>>>> Stashed changes:src/routings/donation.js
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
    Donation.findByIdAndRemove(req.params.id).exec((err, deleteDo) => {
        if (err) {
            res.send(err)
        }
        else{
            res.send(deleteDo)
        }
    }) 
});


 module.exports = router;