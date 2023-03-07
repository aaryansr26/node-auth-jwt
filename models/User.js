const mongoose = require('mongoose');
const { isEmail } = require('validator'); 

const userSchema = mongoose.Schema({
    "email": {
        type: String, 
        required: [true, 'Please enter a email'], 
        unique: true, 
        lower_case: true, 
        validate: [isEmail, 'Please enter a valid email']
    }, 

    "password": {
        type: String, 
        required: [true, 'Please enter a password'], 
        minlength: [6, 'Minimum Password length is 6 characters!'] 
    }
}) ;


const User = mongoose.model('user', userSchema)

module.exports = User; 

