const express = require("express");
const router = express.Router();

const commentCtrl = require("../controllers/comment");

router.get("/:postId", commentCtrl.getAllCommentForPost);
router.post("/:postId", commentCtrl.createCommentForPost);
router.put("/:comId", commentCtrl.modifyCommentForPost);
router.delete("/:comId", commentCtrl.deleteCommentForPost);

module.exports = router;
