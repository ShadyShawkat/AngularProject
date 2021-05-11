const { User } = require("../models/user");
const express = require("express");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const Joi = require("joi");

const router = express.Router();

router.post("/", async (req, res) => {
  const result = Validate(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password");

  validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password");

  const token = user.generateAuthToken();

  //For Angular project only
  res
    .header("x-auth-token", token)
    .status(201)
    .send(_.pick(user, ["name", "email", "isAdmin"]));

  // res.send(token)
});

function Validate(req) {
  const schema = {
    email: Joi.string().min(5).max(25).required().email(),
    password: Joi.string().min(5).max(255).required(),
  };

  return Joi.validate(req, schema);
}

module.exports = router;
