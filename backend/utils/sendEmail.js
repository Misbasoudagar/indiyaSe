const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text, html) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io", // Or Ethereal
      port: 587,
      auth: {
        user: "YOUR_MAILTRAP_USER",
        pass: "YOUR_MAILTRAP_PASS",
      },
    });

    const mailOptions = {
      from: '"Indiyase Team" <no-reply@indiyase.com>',
      to,         // 👈 Accepts ANY valid email
      subject,
      text,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent to:", to);
  } catch (error) {
    console.error("❌ Email send error:", error);
  }
};

module.exports = sendEmail;
