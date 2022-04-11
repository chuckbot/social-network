const db = require("../models");
// Get all posts:
exports.getAllPosts = (req, res, next) => {
  // Limitation de date ? (where: {updatedAt < 1j} ?)
  // Ou findAndCountAll avec limite de posts visibles par pages ?
  db.Post.findAll({ include: db.Profile })
    .then((posts) => {
      res.status(200).json({ posts });
    })
    .catch((error) => {
      res.status(404).json({ error });
    });
};
// Get one post by postId, including profile of creator:
exports.getOnePostById = (req, res, next) => {
  db.Post.findOne({ where: { id: req.params.postId }, include: db.Profile })
    .then((post) => {
      res.status(200).json({ post });
    })
    .catch((error) => {
      res.status(404).json({ error });
    });
};
// Get all posts by type:
exports.getAllPostByType = (req, res, next) => {
  db.Post.findAll({ where: { type: req.params.type } })
    .then((posts) => {
      res.status(200).json({ posts });
    })
    .catch((error) => {
      res.status(404).json({ error });
    });
};
// Get all posts by date:

// Get all posts by profileId:
exports.getAllPostFromUser = (req, res, next) => {
  db.Post.findAll({ where: { profileId: req.params.profileId } })
    .then((posts) => {
      res.status(200).json({ posts });
    })
    .catch((error) => {
      res.status(404).json({ error });
    });
};
// Get posts by title, or part of title:
// Get all important posts:
// Create a post:
exports.createPost = (req, res, next) => {
  db.Profile.findOne({
    where: { userId: req.session.user },
  })
    .then((profile) => {
      const postObj = req.file
        ? {
            ...req.body,
            postPictureURL: `${req.protocol}://${req.get("host")}/images/${
              req.file.filename
            }`,
            profileId: profile.id,
          }
        : { ...req.body, profileId: profile.id };
      db.Post.create({ ...postObj })
        .then((post) => {
          res
            .status(201)
            .json({ message: "Post successfully created. " + post.id });
        })
        .catch((error) => {
          res.status(400).json({ error });
        });
    })
    .catch((error) => {
      res.status(404).json({ error });
    });
};
// Modify a post:
exports.modifyPost = (req, res, next) => {
  db.Profile.findOne({ where: { userId: req.session.user }, include: db.Post })
    .then((profile) => {
      if (profile.Posts.find((post) => post.id === req.params.postId)) {
        const postObj = req.file
          ? {
              ...req.body,
              postPictureURL: `${req.protocol}://${req.get("host")}/images/${
                req.file.filename
              }`,
            }
          : { ...req.body };
        db.Post.update({ ...postObj }, { where: { id: req.params.postId } })
          .then(() => {
            res
              .status(201)
              .json({ message: `Post ${req.params.postId} modified.` });
          })
          .catch((error) => {
            res.status(400).json({ message: "Post update failed: " + error });
          });
      } else {
        res.status(401).json({ message: "Unauthorized access." });
      }
    })
    .catch((error) => {
      res.status(404).json({ message: "Profile not found: " + error });
    });
};
// Delete a post:
exports.deletepost = (req, res, next) => {
  db.Profile.findOne({ where: { userId: req.session.user }, include: db.Post })
    .then((profile) => {
      if (profile.Posts.find((post) => post.id === req.params.postId)) {
        db.Post.destroy({ where: { id: req.params.postId } })
          .then(() => {
            res
              .status(200)
              .json({ message: `Post ${req.params.postId} deleted.` });
          })
          .catch((error) => {
            res.status(400).json({ message: "Post delete failed: " + error });
          });
      } else {
        res.status(401).json({ message: "Unauthorized access." });
      }
    })
    .catch((error) => {
      res.status(404).json({ message: "Profil not found: " + error });
    });
};
