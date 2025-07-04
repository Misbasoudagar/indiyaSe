/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {setGlobalOptions} = require("firebase-functions");
const {onRequest} = require("firebase-functions/https");
const logger = require("firebase-functions/logger");

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
setGlobalOptions({ maxInstances: 10 });

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const functions = require("firebase-functions");
const nodemailer = require("nodemailer");

// ✅ Replace with your Gmail
const GMAIL_USER = "your-email@gmail.com";
const GMAIL_PASS = "your-app-password";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_PASS,
  },
});

// ✅ Function to send email
exports.sendSellerStatusEmail = functions.https.onCall(async (data, context) => {
  const { email, name, status } = data;

  const subject = status === "approved"
    ? "🎉 Your Seller Request is Approved!"
    : "❌ Your Seller Request is Rejected";

  const message = `
    <div style="font-family:sans-serif; padding: 20px;">
      <h2>Hello ${name},</h2>
      <p>Your seller request has been <strong style="color:${status === "approved" ? "green" : "red"}">${status.toUpperCase()}</strong>.</p>
      <p>Regards,<br/>Indiyase Team</p>
    </div>
  `;

  const mailOptions = {
    from: `"Indiyase Team" <${GMAIL_USER}>`,
    to: email,
    subject,
    html: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error: error.toString() };
  }
});
