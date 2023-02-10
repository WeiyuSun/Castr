const commentService = require("../service/comment-service")
const Result = require("../util/Result")
const mongoose = require("mongoose")

const getCommentsFromPost = (req, res) => {
    const post_id = req.query.post_id;
    console.log(post_id);

    if (!mongoose.Types.ObjectId.isValid(post_id)) {
         return res.json(Result.invalidPostId());
    }

    commentService.getAllCommentsFromPost(post_id)
        .then((comments) => {
            res.json(Result.success(comments));
        })
        .catch((err) => {
            res.json(Result.fail(err));
        });
};

const createComment = (req, res) => {
    const {content, post_id, user_id} = req.body;

    console.log(post_id, user_id, content);

    if (!mongoose.Types.ObjectId.isValid(post_id)) {
        return res.json(Result.invalidPostId());
    }
    if (!mongoose.Types.ObjectId.isValid(user_id)) {
        return res.json(Result.invalidUserId());
    }

    commentService.createComment(post_id, user_id, content, Date.now())
        .then((result) => {
            res.json(Result.success(result));
        })
        .catch((err) => {
            res.json(Result.fail(err));
        });
};

module.exports = { getCommentsFromPost, createComment };