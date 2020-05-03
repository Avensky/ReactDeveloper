const mongoose = require('mongoose');
//const Schema = mongoose.Schema;
const { Schema } = mongoose;

const postSchema = new Schema({
    author: String,
    title: String,
    picture: String,
    date: Date,
    body: String,
})

// const user = mongoose.model('users', userSchema);
// module.exports = user;

mongoose.model('posts', postSchema);