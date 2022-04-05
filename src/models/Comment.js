const mongoose = require("mongoose")

const { Schema } = mongoose;

const commentSchema = new Schema({
    title: {type: String, default: false},
    contenue: {type: String, default: false},
    product: {type : mongoose.Schema.Types.ObjectId,
        ref :'Product',
         required: true
        },
    user: {type : mongoose.Schema.Types.ObjectId,
        ref :'User',
         required: true
        },
    comment_date: {type: Date,
         default: false},
        
});
module.exports = mongoose.model("Comment", commentSchema);