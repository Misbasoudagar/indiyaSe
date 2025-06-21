const Order = require('../models/Order');
const User = require('../models/User');

exports.placeOrder = async (req, res) => {
    const { userId, products, total } = req.body;
    try {
        const cashback = total * 0.6;
        const order = new Order({ userId, products, total, cashback });
        await order.save();

        await User.findByIdAndUpdate(userId, { $inc: { wallet: cashback } });

        res.status(201).json({ message: 'Order placed', order });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getUserOrders = async (req, res) => {
    const { userId } = req.params;
    try {
        const orders = await Order.find({ userId }).populate('products');
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
