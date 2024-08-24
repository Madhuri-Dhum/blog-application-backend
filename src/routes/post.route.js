const express = require("express");
const authMiddleware = require("../middleware/validation");
const postController = require("../controllers/post.controller");
const router = express.Router();

router.post("/", authMiddleware, (req, res, next) => {
  try {
    postController.addPost({ ...req.body, author: req.user.id });
    res.status(201).json({ message: "Post added successfully" });
  } catch (error) {
    next(error);
  }
});

router.get("/", authMiddleware, async (req, res, next) => {
  try {
    const posts = await postController.getPosts(req);
    res.status(201).json(posts);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const post = await postController.getPostById(req.params.id);
    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", authMiddleware, async (req, res, next) => {
  try {
    await postController.updatePost(
      { ...req.body, author: req.user.id },
      req.params.id
    );
    res.status(201).json({ message: "Post updated successfully" });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    await postController.deletePost(req.user.id, req.params.id);
    res.status(201).json({ message: "Post deleted successfully" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
