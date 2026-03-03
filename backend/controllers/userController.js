const bcrypt = require("bcrypt");
const db = require("../config/db");

// GET /api/users/profile
const getProfile = async (req, res, next) => {
  try {
    const [rows] = await db.query(
      "SELECT id, name, email, role, created_at, updated_at FROM users WHERE id = ?",
      [req.user.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found." });
    }

    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
};

// PUT /api/users/profile
const updateProfile = async (req, res, next) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required." });
    }

    const [existing] = await db.query(
      "SELECT id FROM users WHERE email = ? AND id != ?",
      [email, req.user.id]
    );
    if (existing.length > 0) {
      return res.status(409).json({ message: "Email already taken by another user." });
    }

    await db.query("UPDATE users SET name = ?, email = ? WHERE id = ?", [
      name,
      email,
      req.user.id,
    ]);

    res.json({ message: "Profile updated successfully." });
  } catch (err) {
    next(err);
  }
};

// PUT /api/users/change-password
const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "Current and new password are required." });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: "New password must be at least 6 characters." });
    }

    const [rows] = await db.query("SELECT password FROM users WHERE id = ?", [req.user.id]);
    const isMatch = await bcrypt.compare(currentPassword, rows[0].password);

    if (!isMatch) {
      return res.status(401).json({ message: "Current password is incorrect." });
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    await db.query("UPDATE users SET password = ? WHERE id = ?", [hashed, req.user.id]);

    res.json({ message: "Password changed successfully." });
  } catch (err) {
    next(err);
  }
};

// GET /api/users (admin only)
const getAllUsers = async (req, res, next) => {
  try {
    const [rows] = await db.query(
      "SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC"
    );
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/users/:id (admin only)
const deleteUser = async (req, res, next) => {
  try {
    if (parseInt(req.params.id) === req.user.id) {
      return res.status(400).json({ message: "You cannot delete your own account." });
    }

    await db.query("DELETE FROM users WHERE id = ?", [req.params.id]);
    res.json({ message: "User deleted successfully." });
  } catch (err) {
    next(err);
  }
};

module.exports = { getProfile, updateProfile, changePassword, getAllUsers, deleteUser };
