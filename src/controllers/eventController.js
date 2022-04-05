const Event =require('../models/Event');
const express = require('express');
const app = express(); 
 
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
  
exports.add = async (req,res) => {
    try {
        // Upload image to cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);
          var event=new Event(
        {
            title:req.body.title,
            description:req.body.description, 
            location:req.body.location,
            Startdate: req.body.Startdate,
            Enddate: req.body.Enddate,
            user:req.body.user, 
            avatar: result.secure_url,
            cloudinary_id: result.public_id,
        }
    ) 
        await event.save();
        res.send("event added");

    }catch(err){
        res.send(err);

    }
};
exports.getAll = async(req,res) => {
    
    res.status(200).send(await Event.find().populate("Donations"));
    
}

exports.findById = async(req,res) => {
    await Event.findOne({_id:req.params.id}).populate('User').populate("Donations").then(Event=>{
        return res.status(200).json(Event);
    }).catch(err=>{
        return res.json(err);
    });
}


exports.delete = async(req,res)=>{
    await Event.deleteOne({_id:req.params.id})
        .then(()=>{
            res.status(200).json("event deleted");
            console.log("event deleted");
        }).catch(function(error){
            console.log(error);
        });
}

/* UPDATE BOOK */
exports.put= async(req, res, next) => {
    
    try {
        // Upload image to cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);
          var event=new Event(
        {
            title:req.body.title,
            description:req.body.description, 
            location:req.body.location,
            Startdate: req.body.Startdate,
            Enddate: req.body.Enddate,
            user:req.body.user, 
            avatar: result.secure_url,
            cloudinary_id: result.public_id,
        }
    ) 
        Event.findByIdAndUpdate(req.params.id, 
            {
                title:req.body.title,
                description:req.body.description, 
                location:req.body.location,
                Startdate: req.body.Startdate,
                Enddate: req.body.Enddate,
                user:req.body.user, 
                avatar: result.secure_url,
                cloudinary_id: result.public_id,
            }
            , function (err, post) {
            if (err) return next(err);
            res.send(post);
        });

    }catch(err){
        res.send(err);

    }

} 
