const Post = require('../models/Post');
const User = require('../models/User');
const Comments = require('../models/Comments');
const Likes = require('../models/Likes');
const Unlikes = require('../models/Unlikes');

const singlePost = async(req, res) => {
    postId = req.params.id;
    const userId = req.session.userId;

    try{
    const post = await Post.findById(postId);
    const user = await User.findById(post.user);
    const loggedUser = await User.findById(userId);

    backURL=req.header('Referer') || '/';

    if(!post){
        return res.redirect(backURL);
    }

    return res.render('singlePost', {
        post: post,
        user: user,
        loggedUser: loggedUser,
        comments: post.comments,
        likesCount: post.likes,
        unlikesCount: post.unlikes
    })
}catch(err){
    console.error(err.message);
}
}

module.exports = singlePost;