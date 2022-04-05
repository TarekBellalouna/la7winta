const Event =require('../models/Event');
const Like = require("../models/Likes");
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
            user:"624586f4d486ec44589d488e", 
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
///////LIKE

exports.addLikes = async (req,res) => {
    const idUser =req.query.idUser;
    const idEvent = req.query.idEvent;
  console.log(req.query)
    try {

          var like=new Like(
        {
            Event: idEvent,
            User: idUser
        }
    ) 
    const likeExist = await Like.findOne({Event:idEvent,User:idUser})
    const likesCount = await Like.find({Event:idEvent})

     if(!likeExist)
        { 
        await like.save();
        
         await Event.findByIdAndUpdate(idEvent,{
         
                $push:{"likes":like._id},
              $set:{
                  LikesNumber:likesCount.length+1
              }
             
        })
        
         res.status(201).send({liked:true,message:"event is liked"});
    }else{
           await Like.findByIdAndRemove(likeExist._id)
           await Event.findByIdAndUpdate(idEvent,{
         
            $pull:{"likes":like._id},
             $set:{
                  LikesNumber:likesCount.length-1
              }
            
    })
          res.status(200).send({disliked:true,message:"event is disliked"});
         }


    }catch(err){
        console.log(err);
        res.send(false);

    }
};
exports.getLikesCount = async (req,res) => {
   
    const idEvent = req.query.idEvent;
  
    try {

         
    const likes = await Like.find({Event:idEvent})
    
     if(!likes)
        { 
        
         res.status(206).send({Number:likes.length});
    }else{
           
          res.status(200).send({Number:likes.length });
         }


    }catch(err){
        console.log(err);
        res.send(false);

    }
};
/////////////
exports.getAll = async(req,res) => {
    try {
        res.status(200).send(await Event.find().populate("likes").populate("Donations").sort({LikesNumber:1}));

    } catch (error) {
        res.status(500).send({error:error})
    }
    
}
/////////////////////////////////////////////////

exports.getUserEvent = async(req,res) => {
    const idUser = req.query.idUser; 

    try {
        res.status(200).send(await Event.find({id:idUser}).populate("likes").populate("Donations").sort({LikesNumber:1}));
    } catch (error) {
        res.status(500).send({error:error})
    }
   
    
}
////////////////////////////////////////////////////
exports.findById = async(req,res) => {
 try {
    await Event.findOne({_id:req.params.id}).populate({path:'user'}).populate("Donations").populate({path:"likes"}) 
    return res.status(200).json(Event);
 } catch (error) {
     res.send(error)
 }
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
