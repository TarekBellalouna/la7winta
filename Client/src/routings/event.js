const express= require('express');
const router = express.Router();
const {check, validationResult} = require ('express-validator');
const { restart } = require('nodemon');  

const {Event} = require('../models/Event');
//@route POST api/event
//@access public
router.post('/', (req, res) => {
    const event = new Event (req.body);
    event.save( (err) => {
        if (err) return res.status(400).json({success: false , err});
        return res.status(200).json({success: true});
    });
});

router.get('/', (req, res) => {
    Event.find().exec((err , events) => {
        if (err) return res.status(400).json({success: false , err});
        return res.status(200).json({success: true, events: events});
    });
});

router.put('/update/:id', (req, res) => {
    Event.findByIdAndUpdate(
req.params.id,
{
    $set: req.body,
},
    (err, event) => {
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