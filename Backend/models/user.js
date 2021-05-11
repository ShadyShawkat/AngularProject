const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');







const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 5,
        maxLength: 50,
        required: true
    },
    email: {
        type: String,
        minLength: 5,
        maxLength: 255,
        required: true,
        unique: true
    },
    password: {
        type: String,
        minLength: 5,
        maxLength: 1500,
        required: true
    },
    isAdmin: Boolean
});


userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get("jwtPrivateKey"));
    return token;
};


const User = mongoose.model('User', userSchema);



function ValidateUser(user) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(25).required().email(),
        password: Joi.string().min(5).max(255).required(),
    };

    return Joi.validate(user, schema);
}



module.exports.User = User;
module.exports.ValidateUser = ValidateUser;