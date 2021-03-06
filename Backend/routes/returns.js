const { response } = require("express");
const express = require("express");
const router = express.Router();
const { Rental } = require("../models/rental");
const { Movie } = require("../models/movie");
const auth = require("../middleware/auth");
const moment = require("moment");

router.post("/", auth, async (req, res, next) => {
  if (!req.body.customerId)
    return res.status(400).send("custoer id is required");

  if (!req.body.movieId) return res.status(400).send("movie id is required");

  const rental = await Rental.findOne({
    "customer._id": req.body.customerId,
    "movie._id": req.body.movieId,
  });

  if (!rental) return res.status(404).send("rental not found");

  if (rental.dateReturned) return res.status(400).send("Already Proccessed");

  rental.dateReturned = new Date();
  const rentalDays = moment().diff(rental.dateOut, "days");

  rental.rentalFee = rentalDays * rental.movie.dailyRentalRate;

  await rental.save();

  await Movie.update({ _id: rental.movie._id }, { $inc: { numberInStock: 1 } });
  return res.status(200).send(rental);

  // res.status(401).send("Unauthoirzed");
});

module.exports = router;
