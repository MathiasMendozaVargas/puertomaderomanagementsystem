//////////////////
// User model
//////////////////

const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please provide your First Name'],
    },
    lastName: {
        type: String,
        required: [true, 'Please provide your Last Name'],
    },
    email: {
        type: String,
        required: [true, 'Please provide your Email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide your Password'],
    },
    birthDay: {
        type: Date,
        required: [true, 'Please provide your Birth Day'],
    },
    gender: {
        type: String,
        required: [true, 'Please provide your Gender'],
    }
})

module.exports = mongoose.model.Users || mongoose.model("Users", UserSchema);