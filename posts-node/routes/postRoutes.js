const express = require("express");
const postController = require("../controllers/postController");
const verifyToken = require("../middleware/authMiddleware");
const router = express.Router();


router
    .route("/")
    .get(postController.getAllPosts)
    .post(postController.createPost);

router
    .route("/:id")
    .get(postController.getOnePost)
    .patch(postController.updatePost)
    .delete(postController.deletePost);


module.exports = router;