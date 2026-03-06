const express = require("express");
const router = express.Router();
const db = require("../config/db");
const https = require("https");

// Send email via SendGrid REST API using native https (no heavy deps)
const sendNotificationEmail = (data) => {
  const apiKey = process.env.SENDGRID_API_KEY;
  if (!apiKey) {
    console.warn("⚠️ SendGrid API key not configured, skipping email notification");
    return;
  }

  const payload = JSON.stringify({
    personalizations: [
      {
        to: [{ email: process.env.EMAIL_TO || "contact@sapivi.com" }],
        subject: `New Contact Form Submission`,
      },
    ],
    from: { email: process.env.EMAIL_FROM || "sapiviteam@gmail.com" },
    reply_to: { email: data.email },
    content: [
      {
        type: "text/html",
        value: `
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
      },
    ],
  });

  const options = {
    hostname: "api.sendgrid.com",
    path: "/v3/mail/send",
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(payload),
    },
  };

  const req = https.request(options, (res) => {
    if (res.statusCode >= 200 && res.statusCode < 300) {
      console.log("✅ Email sent via SendGrid to", process.env.EMAIL_TO || "contact@sapivi.com");
    } else {
      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => console.error("❌ SendGrid error:", res.statusCode, body));
    }
  });

  req.on("error", (err) => console.error("❌ SendGrid request failed:", err.message));
  req.write(payload);
  req.end();
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
