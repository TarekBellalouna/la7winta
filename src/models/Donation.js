const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({

    title: {type: String, required: [true, "can't be blank"]},

  //  picture+nb like


   
    user: [{ type: mongoose.Schema.Types.ObjectId, ref : "User"}] ,
    
    event: { type: mongoose.Schema.Types.ObjectId, ref : "Event"}
        
});


module.exports =
{
    Donation: mongoose.model("donation", DonationSchema),
}  