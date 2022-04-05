const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  user: {
    type:Schema.Types.ObjectId,
    ref :'User',
  },
  name: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    required: false,
  },
  brandId:{
    type:Schema.Types.ObjectId,
    ref :'Brand',
  },
  image: {
    type: String,
    required: false,
  },
  price: {
    type: String,
    required: false,
  },
  color: {
    type: String,
    required: false,
  },
  ratings: {
    type: String,
    required: false,
  },
  reviews: [
    {
      title: String,
      text: String,
      rating: String,
      username: String,
      createdAt: String,
    },
  ],
  total_in_stock: {
    type: Number,
    required: false,
  },
  createdAt: {
    type:Date,
    default: Date.now
  },
  updatedAt: {
    type:Date,
    default: Date.now
  },
  numViews: {
    type:Number,
    default: 0
  },
  gender : {
    type:String,
    required: false
  },
  discount : {
    type : Number ,
    default : 0
  }
});

module.exports = mongoose.model("Product", productSchema);
