const db = require("../models/index");
// Get all comments for a post:
exports.getAllCommentForPost = (req, res, next) => {
  db.Comment.findAll({
    where: { postId: req.params.postId },
    include: db.Profile,
    order: [["createdAt", "ASC"]],
  })
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
        .then((com) => {
          res.status(201).json(com);
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
  db.user
    .findOne({
      where: { id: req.session.user },
      attributes: ["isModerator", "profileId"],
    })
    .then((user) => {
      db.Comment.findOne({ where: { id: req.body.comId } })
        .then((comment) => {
          if (comment.profileId === user.profileId || user.isModerator) {
            db.Comment.update(
              {
                text: req.body.text,
                profileId: comment.profileId,
                postId: req.params.postId,
                id: req.body.comId,
              },
              {
                returning: true,
                where: {
                  id: comment.id,
                },
              }
            )
              .then(() => {
                db.Comment.findOne({ where: { id: req.body.comId } })
                  .then((com) => {
                    res.status(200).json(com);
                  })
                  .catch((error) => {
                    res.status(404).json({ message: error });
                  });
              })
              .catch((error) => {
                res
                  .status(400)
                  .json({ message: "Can't update com : " + error });
              });
          } else {
            res.status(401).json({ message: "Action not authorized." });
          }
        })
        .catch((error) => {
          res.status(404).json({ message: "User not found" + error });
        });
    })
    .catch((error) => {
      res.status(404).json({ message: "User not found " + error });
    });
};

// Delete a comment for a post:
exports.deleteCommentForPost = (req, res, next) => {
  db.User.findOne({
    where: { id: req.session.user },
    attributes: ["isModerator", "profileId"],
  })
    .then((user) => {
      db.Comment.findOne({ where: { id: req.params.comId } })
        .then((comment) => {
          if (comment.profileId === user.profileId || !user.isModerator) {
            db.Comment.destroy({
              where: {
                id: comment.id,
              },
            })
              .then(() => {
                res.status(200).json({ message: "Comment destroyed." });
              })
              .catch((error) => {
                res.status(400).json({ message: error });
              });
          } else {
            res.status(401).json({ message: "Action not authorized." });
          }
        })
        .catch((error) => {
          res.status(404).json({ message: "Comment not found " + error });
        });
    })
    .catch((error) => {
      res.status(404).json({ message: "User not found " + error });
    });
};
