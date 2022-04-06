const mongoose = require('mongoose');


const Event = new mongoose.Schema({
    title:{
        type:String,
        required :true
    },
    description:{
        type:String,
        required :true
    } ,
    likes: [{
        type: mongoose.Types.ObjectId,
        ref: 'likes'
    }],

    avatar: {
        type: String,
    },
    cloudinary_id: {
        type: String,
    },
    
    location:{
        type : String,
        //required : true
    },  
    Startdate:{
        type:Date, 
    },
    CreatedAt:{
        type:Date,
        default:Date.now
    },
    UpdatededAt:{
        type:Date,
    },
    see:{type:Boolean, default: false },
    Enddate:{
        type:Date, 
    },
    LikesNumber:{type:Number,default:0},
    Donations:
        [
            { type: mongoose.Types.ObjectId, ref: "donation", default: [] },
          ] ,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "user"
    }

});

module.exports = mongoose.model('event',Event);

