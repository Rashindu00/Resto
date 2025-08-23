const express = require('express');
const Order = require('../models/Order');

const router = express.Router();

// Get all orders
router.get('/', async (req, res) => {
  try {
    const { status, orderType, page = 1, limit = 10 } = req.query;
    let query = {};

    if (status) {
      query.status = status;
    }

    if (orderType) {
      query.orderType = orderType;
    }

    const orders = await Order.find(query)
      .populate('items.menuItem')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Order.countDocuments(query);

    res.json({
      orders,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get order by ID
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.menuItem');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create new order
router.post('/', async (req, res) => {
  try {
    const order = new Order(req.body);
    
    // Calculate estimated delivery time
    if (order.orderType === 'delivery') {
      order.estimatedDeliveryTime = new Date(Date.now() + 45 * 60 * 1000); // 45 minutes
    } else if (order.orderType === 'takeaway') {
      order.estimatedDeliveryTime = new Date(Date.now() + 20 * 60 * 1000); // 20 minutes
    }

    await order.save();
    await order.populate('items.menuItem');
    
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: 'Validation error', error: error.message });
  }
});

// Update order status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    ).populate('items.menuItem');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    res.status(400).json({ message: 'Validation error', error: error.message });
  }
});

// Update payment status
router.patch('/:id/payment', async (req, res) => {
  try {
    const { paymentStatus, paymentMethod } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { paymentStatus, paymentMethod },
      { new: true, runValidators: true }
    ).populate('items.menuItem');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    res.status(400).json({ message: 'Validation error', error: error.message });
  }
});

// Cancel order
router.delete('/:id', async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: 'cancelled' },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json({ message: 'Order cancelled successfully', order });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get order statistics
router.get('/stats/summary', async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayOrders = await Order.countDocuments({
      createdAt: { $gte: today }
    });

    const totalRevenue = await Order.aggregate([
      { $match: { paymentStatus: 'paid' } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);

    const ordersByStatus = await Order.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    res.json({
      todayOrders,
      totalRevenue: totalRevenue[0]?.total || 0,
      ordersByStatus
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
