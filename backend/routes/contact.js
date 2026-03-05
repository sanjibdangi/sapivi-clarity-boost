const express = require("express");
const router = express.Router();
const db = require("../config/db");
const nodemailer = require("nodemailer");

// Create reusable transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

// Send notification email
const sendNotificationEmail = async (data) => {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn("⚠️ SMTP not configured, skipping email notification");
    return;
  }

  try {
    const transporter = createTransporter();
    await transporter.sendMail({
      from: `"SAPIVI Website" <${process.env.SMTP_USER}>`,
      to: process.env.NOTIFY_EMAIL || "contact@sapivi.com",
      replyTo: data.email,
      subject: `New Contact: ${data.subject || "No Subject"}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;">
          <h2 style="color:#0ea5e9;border-bottom:2px solid #0ea5e9;padding-bottom:10px;">
            New Contact Form Submission
          </h2>
          <table style="width:100%;border-collapse:collapse;margin:20px 0;">
            <tr><td style="padding:8px;font-weight:bold;color:#555;">Name:</td><td style="padding:8px;">${data.name}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;color:#555;">Email:</td><td style="padding:8px;"><a href="mailto:${data.email}">${data.email}</a></td></tr>
            <tr><td style="padding:8px;font-weight:bold;color:#555;">Phone:</td><td style="padding:8px;">${data.phone || "N/A"}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;color:#555;">Subject:</td><td style="padding:8px;">${data.subject || "N/A"}</td></tr>
          </table>
          <div style="background:#f8f9fa;padding:15px;border-radius:8px;margin-top:15px;">
            <p style="font-weight:bold;color:#555;margin-bottom:8px;">Message:</p>
            <p style="white-space:pre-wrap;">${data.message}</p>
          </div>
          <p style="color:#999;font-size:12px;margin-top:20px;">
            Sent from SAPIVI contact form at ${new Date().toLocaleString()}
          </p>
        </div>
      `,
    });
    console.log("✅ Notification email sent to", process.env.NOTIFY_EMAIL || "contact@sapivi.com");
  } catch (err) {
    console.error("❌ Email send failed:", err.message);
  }
};

router.post("/", async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "Name, email and message are required" });
    }

    if (name.length > 100 || email.length > 150 || (message && message.length > 5000)) {
      return res.status(400).json({ message: "Input too long" });
    }

    const sql =
      "INSERT INTO messages (name, email, phone, subject, message) VALUES (?,?,?,?,?)";

    await db.execute(sql, [name, email, phone || null, subject || "", message]);

    // Send email notification (non-blocking)
    sendNotificationEmail({ name, email, phone, subject, message });

    res.json({ message: "Message sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
