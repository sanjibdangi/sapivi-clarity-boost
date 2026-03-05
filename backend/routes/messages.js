const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authMiddleware");
const {
  getMessages,
  submitMessage,
  markAsRead,
  deleteMessage,
} = require("../controllers/messageController");

// GET /api/messages - protected
router.get("/", authenticate, getMessages);

// POST /api/messages - public (contact form)
router.post("/", submitMessage);

// PATCH /api/messages/:id/read - protected
router.patch("/:id/read", authenticate, markAsRead);

// DELETE /api/messages/:id - protected
router.delete("/:id", authenticate, deleteMessage);

module.exports = router;
