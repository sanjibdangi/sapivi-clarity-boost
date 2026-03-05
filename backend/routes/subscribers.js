const express = require("express");
const router = express.Router();
const db = require("../config/db");
const authenticate = require("../middleware/authMiddleware");

// GET /api/subscribers - protected (admin)
router.get("/", authenticate, async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM subscribers ORDER BY created_at DESC");
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// POST /api/subscribers - public
router.post("/", async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email required" });
        }

        await db.execute(
            "INSERT INTO subscribers (email) VALUES (?)",
            [email]
        );

        res.json({ message: "Subscribed successfully" });

    } catch (error) {
        if (error.code === "ER_DUP_ENTRY") {
            return res.status(400).json({ message: "Already subscribed" });
        }
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// DELETE /api/subscribers/:id - protected
router.delete("/:id", authenticate, async (req, res) => {
    try {
        const [result] = await db.query("DELETE FROM subscribers WHERE id=?", [req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Subscriber not found" });
        }
        res.json({ message: "Subscriber deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
