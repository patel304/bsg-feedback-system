const nodemailer = require("nodemailer");
const fs = require("fs");

// Create transporter once (better performance)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Google App Password
  },
});

const sendEmail = async (to, subject, text, attachmentPath) => {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      throw new Error("Email credentials not configured in .env");
    }

    const mailOptions = {
      from: `"BSG India" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>BSG India</h2>
          <p>${text.replace(/\n/g, "<br>")}</p>
        </div>
      `,
    };

    // Attach certificate if path exists
    if (attachmentPath && fs.existsSync(attachmentPath)) {
      mailOptions.attachments = [
        {
          filename: "BSG_Certificate.pdf",
          path: attachmentPath,
        },
      ];
    }

    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent:", info.response);

  } catch (error) {
    console.error("SEND EMAIL ERROR:", error);
    throw error; // Let controller handle it
  }
};

module.exports = sendEmail;
