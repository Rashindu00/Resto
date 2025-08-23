const express = require('express');
const MenuItem = require('../models/MenuItem');

const router = express.Router();

// Get all menu items
router.get('/', async (req, res) => {
  try {
    const { category, available } = req.query;
    let query = {};

    if (category) {
      query.category = category;
    }

    if (available !== undefined) {
      query.available = available === 'true';
    }

    const menuItems = await MenuItem.find(query).sort({ category: 1, name: 1 });
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get menu item by ID
router.get('/:id', async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    res.json(menuItem);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create new menu item (Admin only)
router.post('/', async (req, res) => {
  try {
    const menuItem = new MenuItem(req.body);
    await menuItem.save();
    res.status(201).json(menuItem);
  } catch (error) {
    res.status(400).json({ message: 'Validation error', error: error.message });
  }
});

// Update menu item (Admin only)
router.put('/:id', async (req, res) => {
  try {
    const menuItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    
    res.json(menuItem);
  } catch (error) {
    res.status(400).json({ message: 'Validation error', error: error.message });
  }
});

// Delete menu item (Admin only)
router.delete('/:id', async (req, res) => {
  try {
    const menuItem = await MenuItem.findByIdAndDelete(req.params.id);
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    res.json({ message: 'Menu item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get menu categories
router.get('/categories/list', async (req, res) => {
  try {
    const categories = await MenuItem.distinct('category');
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
