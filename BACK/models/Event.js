const mongoose = require('mongoose');


const EventSchema = new mongoose.Schema({
    title:{
        type:String,
        required :true
    },
    description:{
        type:String,
        required :true
    } ,
    location:{
        type : String,
        required : true
    }, 
    Startdate:{
        type:Date,
        default:Date.now
    },
    CreatedAt:{
        type:Date,
        default:Date.now
    },
    UpdatededAt:{
        type:Date,
        default:Date.now
    },
    Enddate:{
        type:Date,
        default:Date.now
    },
    
    user: [{ type: mongoose.Schema.Types.ObjectId, ref : "User"}],

    donation: [{ type: mongoose.Schema.Types.ObjectId, ref : "Donation"}]

});
module.exports =
{
    Event: mongoose.model("event", EventSchema),
}