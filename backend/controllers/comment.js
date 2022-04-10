const db = require("../models/index");

// Get all comments for a post:
exports.getAllCommentForPost = (req, res, next) => {
  db.Comment.findAll({ where: { postId: req.params.postId } })
    .then((comments) => {
      res.status(200).json({ comments });
    })
    .catch((error) => {
      res.status(404).json({ message: "Can't find comments: " + error });
    });
};

// Create a comment for a post:
exports.createCommentForPost = (req, res, next) => {
  db.Profile.findOne({ where: { userId: req.session.user } })
    .then((profile) => {
      db.Comment.create({
        text: req.body.text,
        postId: req.params.postId,
        profileId: profile.id,
      })
        .then(() => {
          res
            .status(201)
            .json({ message: "Comment created for post " + req.params.postId });
        })
        .catch((error) => {
          res.status(400).json({ message: "Can't create comment: " + error });
        });
    })
    .catch((error) => {
      res.status(404).json({ message: "Profile not found: " + error });
    });
};

// Modify a comment for a post:
exports.modifyCommentForPost = (req, res, next) => {
  db.Profile.findOne({ where: { userId: req.session.user } })
    .then((profile) => {
      const profileId = profile.id;
      db.Comment.findOne({
        where: {
          [Op.and]: [{ profileId: profileId }, { postId: req.params.postId }],
        },
      })
        .then((comment) => {
          db.Comment.update(
            { where: { id: comment.id } },
            {
              text: req.body.text,
              profileId: profileId,
              postId: req.params.postId,
            }
          );
        })
        .catch((error) => {
          res.status(401).json({ message: error });
        });
    })
    .catch((error) => {
      res.status(404).json({ message: error });
    });
};

// Delete a comment for a post:
exports.deleteCommentForPost = (req, res, next) => {
  db.Profile.findOne({ where: { userId: req.session.user } })
    .then((profile) => {
      db.Comment.destroy({
        where: {
          [Op.and]: [{ profileId: profile.id }, { postId: req.params.postId }],
        },
      })
        .then(() => {
          res.status(200).json({ message: "Comment destroyed" });
        })
        .catch((error) => {
          res.status(400).json({ message: error });
        });
    })
    .catch((error) => {
      res.status(404).json({ message: error });
    });
};
