const { User, ValidateUser } = require("../models/user");
const express = require("express");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");
const router = express.Router();

router.get("/me", auth, (req, res) => {
  User.findById(req.user._id)
    .select("-password")
    .then((user) => res.send(user));
});

router.post("/", async (req, res) => {
  console.log(req.body);
  const result = ValidateUser(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  let user = await User.findOne({ email: req.body.email });

  if (user) return res.status(400).send("User alrady registerd");

  user = new User(_.pick(req.body, ["name", "email", "password"]));
  bcrypt
    .genSalt(16)
    .then((c) => bcrypt.hash(user.password, c))
    .then((h) => (user.password = h))
    .then(() => user.save())
    .then((user) => {
      const token = user.generateAuthToken();
      res
        .header("x-auth-token", token)
        .status(201)
        // .send(_.pick(user, ["_id", "name", "email"]));
        //For Angular project only
        .send(_.pick(user, ["name", "email", "isAdmin"]));
    });
});

module.exports = router;
