const { Rental, ValidateRental } = require("../models/rental");
const { Customer } = require("../models/customer");
const { Movie } = require("../models/movie");
const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  Rental.find()
    .sort({ dateOut: 1 })
    .then((Rentals) => res.send(Rentals))
    .catch((err) => res.send(err));
});

router.get("/:id", (req, res, next) => {
  Rental.findById(req.params.id)
    .then((Rental) => res.send(Rental))
    .catch(() => {
      req.myer = "Not Found To Show";
      next();
    });
});

router.post("/", async (req, res, next) => {
  const result = ValidateRental(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) {
    req.myer = "Invalid Customer";
    next();
  }

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) {
    req.myer = "Invalid Movie";
    next();
  }
  console.log(customer, movie);
  const rental = new Rental({
    customer: {
      name: customer.name,
      isGold: customer.isGold,
      phone: customer.phone,
    },
    movie: {
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
    dateOut: new Date(),
    dateReturned: null,
    rentalFee: null,
  });

  rental
    .save()
    .then(async (rental) => {
      movie.numberInStock--;
      await movie.save();
      return res.send(rental);
    })
    .catch((err) => res.status(500).send(err));
});

router.put("/:id", async (req, res, next) => {
  const result = ValidateRental(req.body);
  if (result.error) res.status(400).send(result.error.details[0].message);

  req.body.customer = await Customer.findById(req.body.customerId);
  if (!customer) {
    req.myer = "Invalid Customer";
    next();
  }

  req.body.movie = await Movie.findById(req.body.movieId);
  if (!movie) {
    req.myer = "Invalid Movie";
    next();
  }

  Rental.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((movie) => res.status(200).send(movie))
    .catch(() => {
      req.myer = "Not Found To Update";
      next();
    });
});

router.delete("/:id", (req, res, next) => {
  Rental.findByIdAndDelete(req.params.id)
    .then((rental) => res.status(200).send(rental))
    .catch(() => {
      req.myer = "Not Found To Delete";
      next();
    });
});

module.exports = router;
