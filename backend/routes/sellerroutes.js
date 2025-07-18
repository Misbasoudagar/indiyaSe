const express = require('express');
const router = express.Router();
const Seller = require('../models/sellers');
const sendEmail = require('../utils/sendEmail'); // ✅ Import at top

// ✅ Approve or Reject seller & send email
router.put('/status/:id', async (req, res) => {
  try {
    const { status } = req.body;

    // 1. Update status in MongoDB
    const seller = await Seller.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    // 2. Prepare email content
    const subject = status === 'approved'
      ? '🎉 Seller Request Approved - Indiyase'
      : '❌ Seller Request Rejected - Indiyase';

    const message = `Hi ${seller.name},\n\nYour Indiyase seller request has been ${status.toUpperCase()}.\n\nRegards,\nTeam Indiyase`;

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2 style="color: #4F46E5;">Hello ${seller.name},</h2>
        <p>${
          status === 'approved'
            ? "🎉 Congratulations! Your seller request on <strong>Indiyase</strong> has been <span style='color:green;'>APPROVED</span>."
            : "😔 We're sorry to inform you that your seller request on <strong>Indiyase</strong> has been <span style='color:red;'>REJECTED</span>."
        }</p>
        <p style="margin-top: 20px;">Regards,<br>Team Indiyase</p>
      </div>
    `;

    // 3. ✅ Send the email
    await sendEmail(seller.email, subject, message, htmlBody);

    // 4. Respond to admin
    res.json({ message: `Seller ${status} and email sent.` });

  } catch (err) {
    console.error('❌ Error updating status or sending email:', err);
    res.status(500).json({ error: err.message });
  }
});
// Delete a specific seller by ID
router.delete('/:id', async (req, res) => {
  try {
    await Seller.findByIdAndDelete(req.params.id);
    res.json({ message: 'Seller deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router; 