const mongoose = require('mongoose');
//const Schema = mongoose.Schema;
const { Schema } = mongoose;

const postSchema = new Schema({
    postTitle : {
        type : String,
        uppercase : true,   //it will always covert firstName to Uppercase
        required : true
    },
    author : {
        type : String,
        required : false  
    },
//    postId : {
//        type : String,
//        required : true,
//        unique : true      //ensures this will have always unique value
//    },
    content : {
        type : String,
        required : true
    },
    publishDate : {
        type : String,
        required : true
    }
})

// const user = mongoose.model('users', userSchema);
// module.exports = user;

mongoose.model('posts', postSchema);