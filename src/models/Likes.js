const mongoose = require('mongoose');


const Likes = new mongoose.Schema({

    
    Event:
    {
        
    type: mongoose.Schema.Types.ObjectId,
    ref: "event"
    },
User: {
    type: mongoose.Schema.Types.ObjectId,
    ref : "User"
}
});


module.exports = mongoose.model('likes',Likes);

