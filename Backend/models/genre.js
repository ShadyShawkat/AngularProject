const mongoose = require('mongoose');
const Joi = require('joi');







const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 5,
        maxLength: 20,
        required: true
    }
});


const Genre = mongoose.model('Genre', genreSchema);



function ValidateGenre(genre) {
    const schema = {
        name: Joi.string().min(5).max(20).required()
    };

    return Joi.validate(genre, schema);
}


module.exports.genreSchema = genreSchema;
module.exports.Genre = Genre;
module.exports.ValidateGenre = ValidateGenre;