const express = require("express");
const authMiddleware = require("../middleware/validation");
const userController = require("../controllers/user.controller");
const router = express.Router();

router.get("/", authMiddleware, async (req, res, next) => {
  try {
    const user = await userController.getUserById(req.user.id);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", authMiddleware, async (req, res, next) => {
  try {
    await userController.updateUser(
      { ...req.body, userId: req.user.id },
      req.params.id
    );
    res.status(201).json({ message: "User updated successfully" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
