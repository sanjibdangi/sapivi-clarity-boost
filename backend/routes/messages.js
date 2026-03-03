const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authMiddleware");
const {
  getMessages,
  submitMessage,
  deleteMessage,
} = require("../controllers/messageController");

// GET /api/messages - protected
router.get("/", authenticate, getMessages);

// POST /api/messages - public (contact form)
router.post("/", submitMessage);

// DELETE /api/messages/:id - protected
router.delete("/:id", authenticate, deleteMessage);

module.exports = router;
