const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: false,
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
    required: true,
  },
  profile_picture: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    default: "role"
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
  isAdmin: {
    type: Boolean,
    default: false,
  },
  profileImage: {
    type: String,
  }
});



UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)

})


const User = mongoose.model('user', UserSchema);
module.exports = User;