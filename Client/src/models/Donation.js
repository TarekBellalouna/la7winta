const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({

    title: {type: String, required: [true, "can't be blank"]},

<<<<<<< Updated upstream:Client/src/models/Donation.js

=======
  //  picture+nb like

  NombreLike: {type: Number, default: 0},
>>>>>>> Stashed changes:src/models/Donation.js
   
  avatar: {
    type: String,
},
cloudinary_id: {
    type: String,
},

    user: [{ type: mongoose.Schema.Types.ObjectId, ref : "User"}] ,
    
    event: { type: mongoose.Schema.Types.ObjectId, ref : "Event"}
        
});


module.exports =
{
    Donation: mongoose.model("donation", DonationSchema),
}  