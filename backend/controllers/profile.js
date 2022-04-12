const db = require("../models/index");
// Get all profile:
exports.getAllProfile = (req, res, next) => {
  db.Profile.findAll()
    .then((profiles) => {
      res.status(200).json(profiles);
    })
    .catch((error) => {
      res.status(404).json({ error });
    });
};
// Get a profile by userId:
exports.getProfileById = (req, res, next) => {
  db.Profile.findOne({ where: { userId: req.params.userId } })
    .then((profile) => {
      res.status(200).json(profile);
    })
    .catch((error) => {
      res.status(404).json({ error });
    });
};

// Update a profile:
exports.updateProfile = (req, res, next) => {
  db.Profile.findOne({ where: { userId: req.params.userId } })
    .then(() => {
      const profileObj = req.file
        ? {
            // Modifiable en fonction du JS frontend
            ...req.body,
            profilPictureURL: `${req.protocol}://${req.get("host")}/images/${
              req.file.filename
            }`,
          }
        : req.body;
      db.Profile.update(
        { ...profileObj },
        { where: { userId: req.params.userId } }
      )
        .then(() => {
          res.status(201).json({ message: "Profile modified." });
        })
        .catch((error) => {
          res.status(400).json({ error });
        });
    })
    .catch((error) => {
      res.status(404).json({ error });
    });
};
// Supprimer un profil et un user:
exports.deleteProfile = (req, res, next) => {
  if (req.session.user === req.params.userId) {
    db.Profile.destroy({ where: { useriId: req.params.userId } })
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
            `Can't delete profile with userId ${req.params.userId}: ` + error,
        });
      });
  } else {
    res.status(401).json({ message: "Unauthorized access." });
  }
};
