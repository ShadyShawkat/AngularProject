const mongoose = require("mongoose");
const Joi = require("joi");
const { genreSchema } = require("./genre");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 200,
  },
  genre: genreSchema,
  numberInStock: {
    type: Number,
    default: 0,
    // min: 0
  },
  dailyRentalRate: {
    type: Number,
    default: 0,
    min: 0,
  },
});

const Movie = mongoose.model("Movie", movieSchema);

function ValidateMovie(movie) {
  const schema = {
    title: Joi.string().min(10).max(200).required(),
    genreId: Joi.objectId().required(),
    numberInStock: Joi.number().min(0).default(0),
    dailyRentalRate: Joi.number().min(0).default(0),
  };

  return Joi.validate(movie, schema);
}

module.exports.Movie = Movie;
module.exports.ValidateMovie = ValidateMovie;
