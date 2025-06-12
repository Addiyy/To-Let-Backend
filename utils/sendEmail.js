const nodemailer = require("nodemailer");

const sendEmail = async (email, verificationToken) => {
  // Validate email
  if (!email || typeof email !== "string" || !email.includes("@")) {
    console.error("Invalid or missing email:", email);
  }

  console.log("Email about to be used for verification:", email);

  // Create transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const verificationUrl = `${process.env.CLIENT_URL}/verify/${verificationToken}`;
  console.log("link" , verificationUrl);

  const mailOptions = {
    from: `"To-Let Globe" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Verify Your Email",
    html: `
      <h2>Welcome to Our App 🎉</h2>
      <p>Please verify your email by clicking the link below:</p>
      <a href="${verificationUrl}" target="_blank" style="color:blue;">Verify Email</a>
      <p>This link will expire in 10 minutes.</p>
    `,
  };

  // Send email
  await transporter.sendMail(mailOptions);
  console.log("Verification email sent to:", email);
};

module.exports = sendEmail;
