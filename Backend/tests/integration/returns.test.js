const { Rental } = require("../../models/rental");
const { Movie } = require("../../models/movie");
const moment = require("moment");
const request = require("supertest");
const mongoose = require("mongoose");
const { User } = require("../../models/user");
let server;

describe("/api/returns", () => {
  let customerId;
  let movieId;
  let token;
  let rental;
  let movie;

  const exec = () => {
    return request(server)
      .post("/api/returns")
      .set("x-auth-token", token)
      .send({ customerId, movieId });
  };

  beforeEach(async () => {
    server = require("../../index");
    customerId = mongoose.Types.ObjectId();
    movieId = mongoose.Types.ObjectId();
    token = new User().generateAuthToken();
    movie = new Movie({
      _id: movieId,
      title: "test movie",
      dailyRentalRate: 5,
      genre: { name: "12234" },
      numberInStock: 10,
    });
    await movie.save();
    rental = new Rental({
      customer: {
        name: "Mohamed Mohiey",
        phone: "45687",
        _id: customerId,
      },
      movie: {
        _id: movieId,
        title: "test movie",
        dailyRentalRate: 5,
      },
    });

    await rental.save();
  });

  afterEach(async () => {
    await server.close();
    await Rental.remove({});
    await Movie.remove({});
  });

  it("should return 401 error if the client is not logged in", async () => {
    token = "";
    const res = await exec();
    expect(res.status).toBe(401);
  });

  it("should return 400 error if the customer Id is not provided", async () => {
    customerId = "";
    const res = await exec();
    expect(res.status).toBe(400);
  });

  it("should return 400 error if the movie Id is not provided", async () => {
    movieId = "";
    const res = await exec();
    expect(res.status).toBe(400);
  });

  it("should return 404 error if there is no such a rental", async () => {
    await Rental.remove({});
    const res = await exec();
    expect(res.status).toBe(404);
  });

  it("should return 400 error if the rental is processed", async () => {
    rental.dateReturned = new Date();
    await rental.save();

    const res = await exec();

    expect(res.status).toBe(400);
  });

  it("should return 200 error if we have a valid request", async () => {
    const res = await exec();

    expect(res.status).toBe(200);
  });

  it("should set the return date if we have a valid request", async () => {
    const res = await exec();
    const rentalInDb = await Rental.findById(rental._id);
    const diff = new Date() - rentalInDb.dateReturned;
    expect(diff).toBeLessThan(10 * 1000);
  });

  it("should set the renatl fee if we have a valid request", async () => {
    rental.dateOut = moment().add(-7, "days").toDate();
    await rental.save();

    const res = await exec();
    const rentalInDb = await Rental.findById(rental._id);
    expect(rentalInDb.rentalFee).toBe(35);
  });

  it("should increase th in stock number of movie if we have a valid request", async () => {
    const res = await exec();
    const movieInDb = await Movie.findById(movieId);
    expect(movieInDb.numberInStock).toBe(movie.numberInStock + 1);
  });

  it("should return the rental if we have a valid request", async () => {
    const res = await exec();

    const rentalInDb = await Rental.findById(rental._id);
    expect(Object.keys(res.body)).toEqual(
      expect.arrayContaining([
        "_id",
        "customer",
        "movie",
        "dateReturned",
        "rentalFee",
      ])
    );
  });
});
