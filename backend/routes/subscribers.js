const express = require("express");
const router = express.Router();
const db = require("../config/db");

// POST subscribe email
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

module.exports = router;