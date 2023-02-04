const  {
    getAllPosts, 
    getPostByID,
    getAllPostsFromUser,
    createPost,
    removePostByID,
    removeAllPostsFromUser,
 } = require('../model/post-model');

 class PostServices {
    getAllPosts = () => getAllPosts();
    getPostByID = (id) => getPostByID(id);
    getAllPostsFromUser = (user_id) => getAllPostsFromUser(user_id);
    createPost = (user_id, content, image) => createPost(user_id, content, image);
    removePostByID = (id) => removePostByID(id);
    removeAllPostsFromUser = (user_id) => removeAllPostsFromUser(user_id);
 }

 module.exports = PostServices;