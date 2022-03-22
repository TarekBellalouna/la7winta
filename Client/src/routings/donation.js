const express= require('express');
const router = express.Router();
const {check, validationResult} = require ('express-validator');
const { restart } = require('nodemon');  

const {Donation} = require('../models/Donation');
//@route POST api/donation

//@access public
router.post('/', (req, res) => {
    const donation = new Donation (req.body);
    donation.save( (err) => {
        if (err) return res.status(400).json({success: false , err});
        return res.status(200).json({success: true});
    });
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