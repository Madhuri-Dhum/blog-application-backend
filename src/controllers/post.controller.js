const Post = require("../models/post.model");

const addPost = (post) => {
  return Post.create(post);
};

const getPosts = (req) => {
  let condition = {};

  if (req.query.byAuthor) {
    condition = { author: req.user.id };
  }

  return Post.find(condition).sort({ createdAt: -1 }).populate({
    path: "author",
    select: "-password",
  });
};

const getPostById = (id) => {
  return Post.findById(id).populate({ path: "author", select: "-password" });
};

const updatePost = async (post, postId) => {
  try {
    const postDetails = await postById(postId);

    if (postDetails.author.toString() !== post.author) {
      const error = new Error("You don't have access");
      error.statusCode = 403;
      throw error;
    }

    await Post.findByIdAndUpdate(postId, post);
    return;
  } catch (error) {
    throw error;
  }
};

const deletePost = async (author, postId) => {
  try {
    console.log("delete post", author, postId);
    const postDetails = await postById(postId);

    if (postDetails.author.toString() !== author) {
      const error = new Error("You don't have access");
      error.statusCode = 403;
      throw error;
    }

    return Post.deleteOne({ _id: postId });
  } catch (error) {
    throw error;
  }
};

const postById = async (postId) => {
  try {
    const post = await Post.findById({ _id: postId });

    if (!post) {
      const error = new Error("Post not found");
      error.statusCode = 404;
      throw error;
    }

    return post;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addPost,
  updatePost,
  getPosts,
  getPostById,
  deletePost,
};
