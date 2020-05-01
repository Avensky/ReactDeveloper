const mongoose = require('mongoose');
//const Schema = mongoose.Schema;
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
    name: String,
    givenName: String,
    familyName: String,
    picture: String,
    email: String
})

// const user = mongoose.model('users', userSchema);
// module.exports = user;

mongoose.model('users', userSchema);