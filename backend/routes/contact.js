const express = require("express");
const router = express.Router();
const db = require("../config/db");
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.post("/", async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !subject || !message) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Save to database
        const sql =
            "INSERT INTO contact_messages (name,email,subject,message) VALUES (?,?,?,?)";

        await db.execute(sql, [name, email, subject, message]);

        // 📩 Email to Admin
        const adminMail = {
            to: process.env.EMAIL_TO,
            from: process.env.EMAIL_FROM,
            subject: `New Contact Message: ${subject}`,
            html: `
        <h2>New Message from Website</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Subject:</b> ${subject}</p>
        <p><b>Message:</b></p>
        <p>${message}</p>
      `,
        };

        // 📩 Auto reply to user
        const autoReply = {
            to: email,
            from: process.env.EMAIL_FROM,
            subject: "Thank you for contacting SAPIVI",
            html: `
        <h2>Hello ${name},</h2>
        <p>Thank you for reaching out to <b>SAPIVI</b>.</p>
        <p>Our team has received your message and will respond within <b>24 hours</b>.</p>

        <p><b>Your message:</b></p>
        <p>${message}</p>

        <br/>

        <p>Best Regards,</p>
        <p><b>SAPIVI Team</b></p>
      `,
        };

        await sgMail.send(adminMail);
        await sgMail.send(autoReply);

        res.json({ message: "Message sent successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;