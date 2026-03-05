const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.post("/", async (req, res) => {
    try {
        const { name, email, phone, subject, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ message: "Name, email and message are required" });
        }

        // Basic spam validation
        if (name.length > 100 || email.length > 150 || (message && message.length > 5000)) {
            return res.status(400).json({ message: "Input too long" });
        }

        const sql =
            "INSERT INTO messages (name, email, phone, subject, message) VALUES (?,?,?,?,?)";

        await db.execute(sql, [name, email, phone || null, subject || "", message]);

        res.json({ message: "Message sent successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
