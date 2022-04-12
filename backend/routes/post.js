const express = require("express");
const router = express.Router();

const multer = require("../middleware/multer");

const postCtrl = require("../controllers/post");

router.get("/", postCtrl.getAllPosts);
router.get("/:postId", postCtrl.getOnePostById);
router.get("/:postType", postCtrl.getAllPostByType);
router.get("/user/:profileId", postCtrl.getAllPostFromUser);
router.post("/", multer, postCtrl.createPost);
router.put("/:postId", multer, postCtrl.modifyPost);
router.delete("/:postId", postCtrl.deletepost);

module.exports = router;
