const User = require('../models/User');

exports.getWallet = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId);
        res.json({ wallet: user.wallet });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
