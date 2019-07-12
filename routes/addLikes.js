const Post = require("../models/Post");

const addLikes = async (req, res) => {
  const postId = req.params.id;
  const userId = req.session.userId;

  if(userId == undefined || userId == null){
      return res.send('You Need to logged in first');
  }

  try{
        
    const post = await Post.findById(postId);

    if(!post){
        return res.send('No Post Found');
    }

    if(post.likes.filter(like => like.user.toString() === userId).length > 0 ){
        return res.send('Already Liked this Post');
    }

    

    post.likes.unshift({ user: userId });

    // get remove Index
    const removeIndex = post.unlikes.map(unlike => unlike.user.toString()).indexOf(userId);
    post.unlikes.splice(removeIndex, 1);

    await post.save();

    return res.send(post.likes);

  }catch(err){
      console.error(err.message);
  }
};
module.exports = addLikes;
