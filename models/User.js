const mongoose = require('mongoose');
//const Schema = mongoose.Schema;
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
    username: { 
        type: String, 
        unique: false, 
        required: false 
    },
    givenName: String,
    familyName: String,
    email: String,
    password: { 
        type: String, 
        unique: false, 
        required: false 
    },
    picture: String,
    date : Date
})

// Define schema methods
userSchema.methods = {
	checkPassword: function (inputPassword) {
		return bcrypt.compareSync(inputPassword, this.password)
	},
	hashPassword: plainTextPassword => {
		return bcrypt.hashSync(plainTextPassword, 10)
	}
}

// Define hooks for pre-saving
userSchema.pre('save', function (next) {
	if (!this.password) {
		console.log('models/user.js =======NO PASSWORD PROVIDED=======')
		next()
	} else {
		console.log('models/user.js hashPassword in pre save');
		
		this.password = this.hashPassword(this.password)
		next()
	}
})

// const user = mongoose.model('users', userSchema);
// module.exports = user;

mongoose.model('users', userSchema);