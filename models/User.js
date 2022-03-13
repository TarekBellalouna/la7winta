const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required :true
    },
    email:{
        type : String,
        required : true,
        unique : true
    },
    password:{
        type:String,
        required: true
    },
    avatar:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    },
    accType: {
        type: String,
        enum: ['FREE', 'PREMIUM'],
        default: 'FREE'
    },
    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER'
    },
    status: {type: Boolean, default: true},
});

module.exports = User= mongoose.model('user',UserSchema)