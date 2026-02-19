const nodemailer = require("nodemailer");
const fs = require("fs");

// Create transporter once (Production Safe SMTP)
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Google App Password
  },
});

const sendEmail = async (to, subject, text, attachmentPath) => {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      throw new Error("Email credentials not configured properly");
    }

    const mailOptions = {
      from: `"BSG India" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2 style="color:#1e3a8a;">Bharat Scouts & Guides</h2>
          <p>${text.replace(/\n/g, "<br>")}</p>
        </div>
      `,
    };

    // Attach certificate if exists
    if (attachmentPath && fs.existsSync(attachmentPath)) {
      mailOptions.attachments = [
        {
          filename: "BSG_Certificate.pdf",
          path: attachmentPath,
        },
      ];
    }

    const info = await transporter.sendMail(mailOptions);

    console.log("EMAIL SENT SUCCESSFULLY:", info.response);

  } catch (error) {
    console.error("SEND EMAIL ERROR:", error);
    throw error;
  }
};

module.exports = sendEmail;
