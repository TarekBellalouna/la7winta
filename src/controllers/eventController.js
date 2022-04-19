const Event =require('../models/Event');
const Like = require("../models/Likes");
const express = require('express');
const app = express(); 
 
const cloudinary = require("../utils/cloudinary"); 

const upload = require("../utils/multer");
  
exports.add = async (req,res) => {
    console.log(req.file);
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
            user:req.query.idUser, 
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
    searchValue=req.query.searchValue
    try {
        res.status(200).send(await Event.find({title:new RegExp(`^${searchValue}`,"i")}).populate("likes").populate("Donations").populate("user").sort({LikesNumber:1}));

    } catch (error) {
        res.status(500).send({error:error})
    }
    
}
/////////////////////////////////////////////////

exports.getUserEvent = async(req,res) => {
    const idUser = req.query.idUser; 
    searchValue=req.query.searchValue
   
    try {
        res.status(200).send(await Event.find({user:idUser,title:new RegExp(`^${searchValue}`,"i")}).populate("likes").populate("Donations").populate("user").sort({LikesNumber:1}));
    } catch (error) {
        res.status(500).send({error:error})
    }
   
    
}
////////////////////////////////////////////////////
 
exports.findById2 = async(req,res) => {
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
exports.put= async(req, res) => {
const idEvent = req.query.idEvent
    try {
        // Upload image to cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);
        
        const updatedEvent =await Event.findByIdAndUpdate(idEvent, 
            {
                $set:{
                title:req.body.title,
                description:req.body.description, 
                location:req.body.location,
                Startdate: req.body.Startdate,
                Enddate: req.body.Enddate,
                user:req.body.user, 
                avatar: result.secure_url,
                cloudinary_id: result.public_id,}
            }
           
        );
res.status(200).send(updatedEvent)
    }catch(err){
        console.log(err);
        res.send(err);

    }

} 
