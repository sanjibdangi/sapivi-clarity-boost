const db = require("../config/db");

// GET /api/messages
const getMessages = async (req, res, next) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM contact_messages ORDER BY created_at DESC"
    );

    res.json(rows);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

// POST /api/messages (public)
const submitMessage = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ message: "Name, email and message are required." });
    }

    const [result] = await db.query(
      "INSERT INTO contact_messages (name, email, subject, message) VALUES (?,?,?,?)",
      [name, email, subject || "", message]
    );

    res.status(201).json({
      id: result.insertId,
      message: "Message sent successfully.",
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

// DELETE /api/messages/:id
const deleteMessage = async (req, res, next) => {
  try {
    const [result] = await db.query(
      "DELETE FROM contact_messages WHERE id=?",
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Message not found." });
    }

    res.json({ message: "Message deleted successfully." });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = { getMessages, submitMessage, deleteMessage };