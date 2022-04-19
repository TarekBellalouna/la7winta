const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  }, 
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
  password: {
    type: String,
    required: true,
  },
  newpassword: {
    type: String,
  },
  phone: {
    type: String,
    required: false,
  },
  profile_picture: {
    type: String,
    required: false,
    default:"https://res.cloudinary.com/espritla7winta/image/upload/v1649521264/av_e4zglx.jpg"
  }, 
  location: {
    type: String,
    required: false,
  }, 
cloudinary_user: {
    type: String,
    default:"av_e4zglx"
},
  isAdmin: {
    type: Boolean,
    required:true,
    default: false,
  }, 
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ], 
  reset_password_token: {
    type: String,
    required: false,
  },
  reset_password_expiration: {
    type: String,
    required: false,
  },


  accType: {
    type: String,
    enum: ['FREE', 'PREMIUM'],
    default: 'FREE'
  },
  status: { type: Boolean, default: true },
  
},{timestamps:true});


UserSchema.statics.login = async function(email, password) {
  const user = await this.findOne({ email });
   if (user) {
      return user;}},
      
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};



const User = mongoose.model('user', UserSchema);
module.exports = User;