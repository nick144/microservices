const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        require: [true, "Post must have title"],
    },
    description: {
        type: String,
        require: [true, "Post mush have body"],
    },
    published: {
        type: Boolean
        // require: [true, "Post mush have author id"],
    },
    userId: {
        type: String,
        require: [true, "Post mush have author id"],
    }
});

const Posts = mongoose.model("Posts", PostSchema);
module.exports = Posts;