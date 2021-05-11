const { Genre, ValidateGenre } = require("../models/genre");
const express = require("express");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const router = express.Router();

// const Genres = [
//     { id: 1, name: 'Action' },
//     { id: 2, name: 'Drama' },
//     { id: 3, name: 'Horror' },
//     { id: 4, name: 'Documentry' }
// ];

router.get("/", (req, res, next) => {
  Genre.find()
    .sort({ name: 1 })
    .then((genres) => res.send(genres))
    .catch((err) => {
      req.myer = "Something failed";
      next(err);
    });

  /*res.send(Genres);*/
});

router.get("/:id", (req, res, next) => {
  Genre.findById(req.params.id)
    .then((genre) => res.send(genre))
    .catch(() => {
      req.myer = "Not Found To Show";
      next();
    });

  // const genre = Genres.find(g => g.id === parseInt(req.params.id));
  // if (!genre) res.status(404).send('Not found');
  // res.send(genre);
});

// router.post("/", [auth, admin], (req, res) => {
//   console.log("innnn");
//   const result = ValidateGenre(req.body);
//   if (result.error)
//     return res.status(400).send(result.error.details[0].message);
//   const genre = new Genre(req.body);
//   genre.save().then((genre) => res.status(201).send(genre));

//   // const genre = { id: Genres.length + 1, name: req.body.name };
//   // Genres.push(genre);

//   // res.send(genre);
// });

router.post("/", (req, res) => {
  const result = ValidateGenre(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);
  const genre = new Genre(req.body);
  genre.save().then((genre) => res.status(201).send(genre));
});

router.put("/:id", (req, res, next) => {
  const result = ValidateGenre(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  Genre.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((genre) => res.status(200).send(genre))
    .catch(() => {
      req.myer = "Not Found To Update";
      next();
    });

  // const genre = Genres.find(g => g.id === parseInt(req.params.id));
  // if (!genre) return res.status(404).send('Not found');

  // const result = ValidateGenre(req.body);
  // if (result.error) return res.status(400).send(result.error.details[0].message);

  // genre.name = req.body.name;
  // res.send(genre);
});

router.delete("/:id", (req, res, next) => {
  Genre.findByIdAndDelete(req.params.id)
    .then((genre) => res.status(200).send(genre))
    .catch(() => {
      req.myer = "Not Found To Delete";
      next();
    });

  // const genre = Genres.find(g => g.id === parseInt(req.params.id));
  // if (!genre) return res.status(404).send('Not found');

  // const index = Genres.indexOf(genre);
  // Genres.splice(index, 1);

  // res.send(genre);
});

module.exports = router;
