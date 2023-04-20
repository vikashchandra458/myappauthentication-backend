const config = require('../../config.json')
const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("../../_middleware/validate-request");
const userService = require("./user.service");
const db = require('../../_db/db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
// routes
router.post("/login", authenticateSchema, auth);

router.post("/register", registerSchema, register);





function authenticateSchema(req, res, next) {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });
  validateRequest(req, next, schema);
}




function auth(req, res, next) {
  userService
    .auth(req.body)
    .then((user) => {
      res.status(user.status).json(user);
    })
    .catch((err) => {
      console.log(err);
      if (err.status !== undefined) {
        res.status(err.status).send(err);
      } else {
        res.send(err);
      }
      next;
    });
  // const { email, password } = req.body;

  // try {
  //   const user = await db.User.findOne({ where: { email } });
  //   if (!user) {
  //     return res.status(400).json({ message: 'Invalid credentials' });
  //   }
  //   const isMatch = await bcrypt.compare(password, user.password);

  //   if (!isMatch) {
  //     return res.status(400).json({ message: 'Invalid credentials' });
  //   }
  //   const payload = {
  //     user: {
  //       id: user.id,
  //     },
  //   };

  //   const token = jwt.sign(payload, config.secret , { expiresIn: '1h' });

  //   res.json({ message: "User login successfully", token });
  // } catch (error) {
  //   console.error(error.message);
  //   res.status(500).send('Server Error');
  // }
}

function registerSchema(req, res, next) {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(6).required(),
  });
  validateRequest(req, next, schema);
}

function register(req, res, next) {
  userService
    .create(req.body)
    .then((user) => {
      if (!user) {
        res.json({ message: "Registration successful", status: 200 });
      } else {
        res.status(user.status).json(user);
      }
    })
    .catch((err) => {
      console.log(err);
      if (err.status !== undefined) {
        res.status(err.status).send(err);
      } else {
        res.send(err);
      }
      next;
    });
}

module.exports = router;
