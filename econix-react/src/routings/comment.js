const express = require("express");
const router = express.Router();

const checkAuth = require("../middlewares/check-auth");
const commentController = require("../controllers/comment");

router.get("/", commentController.fetchComments);
router.get("/fetch-comment/:commentId", commentController.fetchComment);
router.get("/fetch-comment-byprod/:commentId", commentController.fetchCommentByproduct);
router.post("/add-comment", commentController.addComment);
router.post("/edit-comment", commentController.editComment);
router.delete("/delete-comment", commentController.deleteComment);

module.exports = router;
 