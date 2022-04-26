const mongoose = require("mongoose")

const { Schema } = mongoose;
const Product = require("./Product");

const ratingSchema = new Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
    nb_etoile: {type: Number, required: true},
        
});
module.exports = mongoose.model("Rating", ratingSchema);
// module.exports =
// {
//     Rating: mongoose.model("rating", ratingSchema),
// }  