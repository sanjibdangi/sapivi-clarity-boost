const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authMiddleware");
const {
  getProfile,
  updateProfile,
  changePassword,
  getAllUsers,
  deleteUser,
} = require("../controllers/userController");

// Protected routes - require JWT
router.get("/profile", authenticate, getProfile);
router.put("/profile", authenticate, updateProfile);
router.put("/change-password", authenticate, changePassword);
router.get("/", authenticate, getAllUsers);
router.delete("/:id", authenticate, deleteUser);

module.exports = router;
