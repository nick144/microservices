const express = require("express");
const postController = require("../controllers/postController");
const verifyToken = require("../middleware/authMiddleware");
const router = express.Router();


router
    .route("/")
    .get(verifyToken, postController.getAllPosts)
    .post(verifyToken, postController.createPost);

router
    .route("/:id")
    .get(verifyToken, postController.getOnePost)
    .patch(verifyToken, postController.updatePost)
    .delete(verifyToken, postController.deletePost);


module.exports = router;