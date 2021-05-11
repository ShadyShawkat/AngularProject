const { Movie, ValidateMovie } = require("../models/movie");
const { Genre } = require("../models/genre");
const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  Movie.find()
    .sort({ title: 1 })
    .then((Movies) => res.send(Movies))
    .catch((err) => res.send(err));
});

router.get("/:id", (req, res, next) => {
  Movie.findById(req.params.id)
    .then((Movie) => res.send(Movie))
    .catch(() => {
      req.myer = "Not Found To Show";
      next();
    });
});

router.post("/", async (req, res, next) => {
  const result = ValidateMovie(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) {
    req.myer = "Invalid Genre";
    next();
  }

  const movie = new Movie(req.body);
  movie.genre = {
    _id: genre._id,
    name: genre.name,
  };
  movie
    .save()
    .then((Movie) => res.status(201).send(Movie))
    .catch((err) => res.status(500).send(err));
});

router.put("/:id", async (req, res, next) => {
  const result = ValidateMovie(req.body);
  if (result.error) res.status(400).send(result.error.details[0].message);

  let genre = await Genre.findById(req.body.genreId);
  req.body.genre = {
    _id: genre._id,
    name: genre.name,
  };
  Movie.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((genre) => res.status(200).send(genre))
    .catch(() => {
      req.myer = "Not Found To Update";
      next();
    });
});

router.delete("/:id", (req, res, next) => {
  Movie.findByIdAndDelete(req.params.id)
    .then((Movie) => res.status(200).send(Movie))
    .catch(() => {
      req.myer = "Not Found To Delete";
      next();
    });
});

module.exports = router;
