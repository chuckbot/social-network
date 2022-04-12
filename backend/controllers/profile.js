const db = require("../models/index");
const { access, constants, unlink } = require("fs");
const { decodeToken } = require("../scripts/token");

// Get all profile:
exports.getAllProfile = (req, res, next) => {
  db.Profile.findAll({
    order: [["firstName", "ASC"]],
    include: [{ model: db.User, attributes: ["email"] }],
  })
    .then((profiles) => {
      res.status(200).json(profiles);
    })
    .catch((error) => {
      res.status(404).json({ message: error });
    });
};

// Get a profile by userId:
exports.getProfileById = (req, res, next) => {
  db.Profile.findOne({
    where: {
      userId: req.params.userId,
    },
    include: [
      { model: db.Post, separate: true, order: [["updatedAt", "DESC"]] },
      { model: db.User, attributes: ["email"] },
    ],
  })
    .then((profile) => {
      res.status(200).json(profile);
    })
    .catch((error) => {
      res.status(404).json({ error });
    });
};

// Update a profile:
exports.updateProfile = (req, res, next) => {
  const isModerator = decodeToken(req).isModerator;
  db.Profile.findOne({ where: { userId: req.params.userId } })
    .then((profile) => {
      if (req.session.user === req.params.userId || isModerator) {
        const imgPathArray = profile.profilePictureURL.split("/");
        const imgPath = `./images/${imgPathArray[imgPathArray.length - 1]}`;
        access(imgPath, constants.F_OK, (err) => {
          if (!err) {
            unlink(imgPath, (err) => {
              if (err) {
                console.log(err);
              }
              console.log(
                `${imgPath.split("/")[imgPath.split("/").length - 1]} deleted.`
              );
            });
          } else {
            console.log(err);
          }
        });
        const profileObj = req.file
          ? {
              // Modifiable en fonction du JS frontend
              ...req.body,
              profilePictureURL: `${req.protocol}://${req.get("host")}/images/${
                req.file.filename
              }`,
            }
          : req.body;
        db.Profile.update(
          {
            ...profileObj,
            position:
              req.body.position === "null"
                ? "Travaille chez Groupomania"
                : req.body.position,
            description:
              req.body.description === "null" ? "✌️" : req.body.description,
          },
          { where: { userId: req.params.userId } }
        )
          .then(() => {
            res.status(201).json({ message: "Profile modified." });
          })
          .catch((error) => {
            res.status(400).json({ error: error });
          });
      } else {
        res.status(401).json({ message: "Unauthorized access." });
      }
    })
    .catch((error) => {
      res.status(404).json(error);
    });
};

// Delete a profile and a user:
exports.deleteProfile = (req, res, next) => {
  const isModerator = decodeToken(req).isModerator;
  db.Profile.findOne({ where: { userId: req.params.userId } })
    .then((profile) => {
      if (req.session.user === req.params.userId || isModerator) {
        const imgPathArray = profile.profilePictureURL.split("/");
        const imgPath = `./images/${imgPathArray[imgPathArray.length - 1]}`;
        access(imgPath, constants.F_OK, (err) => {
          if (!err) {
            unlink(imgPath, (err) => {
              if (err) {
                console.log(err);
              }
              console.log(
                `${imgPath.split("/")[imgPath.split("/").length - 1]} deleted.`
              );
            });
          } else {
            console.log(err);
          }
        });
        db.Profile.destroy({ where: { userId: req.params.userId } })
          .then(() => {
            db.User.destroy({ where: { id: req.params.userId } })
              .then(() => {
                res.status(200).json({
                  message: `User ${req.params.userId} successfully deleted.`,
                });
              })
              .catch((error) => {
                res.status(400).json({
                  message:
                    `Can't delete profile with userId ${req.params.userId}: ` +
                    error,
                });
              });
          })
          .catch((error) => {
            res.status(400).json({
              message:
                `Can't delete profile with userId ${req.params.userId}: ` +
                error,
            });
          });
      } else {
        res.status(401).json({ message: "Unauthorized access." });
      }
    })
    .catch((error) => {
      res.status(404).json({ message: error });
    });
};
