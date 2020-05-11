const mongoose = require('mongoose');
//const Schema = mongoose.Schema;
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
    username: String,
    givenName: String,
    familyName: String,
    email: String,
    password: String,
    picture: String,
    date : Date
})

// const user = mongoose.model('users', userSchema);
// module.exports = user;

mongoose.model('users', userSchema);