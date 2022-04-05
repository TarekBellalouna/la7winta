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
  email_confirmation: {
    type: String,
    required: false,
  },
  reset_password_token: {
    type: String,
    required: false,
  },
  reset_password_expiration: {
    type: String,
    required: false,
  },

  CreatedAt: {
    type: Date,
    default: Date.now
  },
  accType: {
    type: String,
    enum: ['FREE', 'PREMIUM'],
    default: 'FREE'
  },
  status: { type: Boolean, default: true },
  
});


UserSchema.statics.login = async function(email, password) {
  const user = await this.findOne({ email });
   if (user) {
      return user;}},
      
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)

})


const User = mongoose.model('user', UserSchema);
module.exports = User;