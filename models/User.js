const mongoose = require('mongoose');
const { isEmail } = require('validator'); 
const bcrypt = require('bcrypt');  

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

// fire a function before doc is saved into database
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt); 
    next(); 
});

//static method to login user
userSchema.statics.login = async function(email, password) { 
    const user = await this.findOne({email}); 
    if (user) {
        const auth = await bcrypt.compare(password, user.password)
        if(auth) {
            return user; 
        }
        throw Error('Incorrect Password'); 
    }
    throw Error('Incorrect Email')
}

const User = mongoose.model('user', userSchema)

module.exports = User; 

