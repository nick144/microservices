const Post = require("../models/Posts")

exports.getAllPosts = async (req, res, next) => {
    try {
        const posts = await Post.find({published: true}).sort({'_id': -1});
        res.status(200).json({
            status: 'Success',
            results: posts.length,
            data: posts
        })
    } catch (e) {
        console.log(e);
        res.status(400).json({
            status: 'fail'
        });
    }
};

exports.getOnePost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json({
            status: 'Success',
            data: {
                post
            }
        })
    } catch (e) {
        console.log(e);
        res.status(400).json({
            status: 'fail'
        });
    }
};

exports.createPost = async (req, res, next) => {
    try {
        const post = await Post.create({
            title: req.body.title,
            description: req.body.description,
            published: true,
            userId: req.session.user.user_id
        });
        res.status(200).json({
            status: 'Success',
            results: post.length,
            data: {
                post
            }
        })
    } catch (e) {
        console.log(e);
        res.status(400).json({
            status: 'fail'
        });
    }
};

exports.updatePost = async (req, res, next) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            status: 'Success',
            data: {
                post
            }
        })
    } catch (e) {
        console.log(e);
        res.status(400).json({
            status: 'fail'
        });
    }
};


exports.deletePost = async (req, res, next) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: 'Success'
        })
    } catch (e) {
        console.log(e);
        res.status(400).json({
            status: 'fail'
        });
    }
};