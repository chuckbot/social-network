const bcrypt = require("bcrypt");
require("express-session");
const { decodeToken, createToken } = require("../scripts/token");

const db = require("../models/index");

// Create new user and his empty profile:
exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = db.User.create({
        email: req.body.email,
        password: hash,
        isModerator: req.body.email === "admin@groupomania.com" ? true : false,
      });
      return user;
    })
    .then((user) => {
      db.User.findOne({ where: { email: req.body.email } }).then((user) => {
        db.Profile.create({ userId: user.id });
      });
      return user;
    })
    .then(() =>
      res.status(201).json({
        message: "User and his profil created.",
      })
    )
    .catch((error) => res.status(400).json({ message: error }));
};

// Connect user:
exports.signin = (req, res, next) => {
  db.User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error });
          }
          // Creating cookie
          req.session.user = user.id;
          // Creating Token
          const token = createToken({
            userId: user.id,
            isModerator: user.isModerator,
          });
          res.status(200).json({ userId: user.id, token });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(404).json(error));
};

// Get a userId:
exports.getUser = (req, res, next) => {
  if (req.session) {
    res.status(200).json({ userId: req.session.user });
  } else {
    res.status(200).json({ message: "Cookie not present." });
  }
};

// Logout :
exports.logout = (req, res, next) => {
  if (req.session) {
    req.session.destroy((error) => {
      if (error) {
        res.status(400).json({ message: "Unable to logout." });
      } else {
        res.status(200).json({ message: "Logout successful." });
      }
    });
  } else {
    res.end();
  }
};

// Password change:
exports.changePassword = (req, res, next) => {
  const isModerator = decodeToken(req).isModerator;
  db.User.findOne({ where: { id: req.session.user } })
    .then((user) => {
      if (req.params.id === user.id || isModerator) {
        bcrypt
          .hash(req.body.password, 10)
          .then((hash) => {
            db.User.update({ password: hash }, { where: { id: req.params.id } })
              .then(() => {
                res.status(201).json({ message: "Password changed." });
              })
              .catch((error) => {
                res.status(400).json({ message: error });
              });
          })
          .catch((error) => {
            res.status(400).json({ message: error });
          });
      } else {
        res.status(401).json({ message: "Unauthaurized access." });
      }
    })
    .catch((error) => {
      res.status(404).json({ message: "User not found" + error });
    });
};

// Deleting a user:
exports.destroyUser = (req, res, next) => {
  const isModerator = decodeToken(req).isModerator;
  db.User.findOne({ where: { id: req.session.user } })
    .then((user) => {
      if (req.session.user === user.id || isModerator) {
        db.User.destroy({ where: { id: req.params.id } })
          .then(() => {
            res.status(201).json({ message: "User destroyed." });
          })
          .catch((error) => {
            res.status(400).json({ error });
          });
      } else {
        res.status(401).json({ message: "Unauthorized access." });
      }
    })
    .catch((error) => {
      res.status(404).json({ message: error });
    });
};
