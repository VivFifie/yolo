// routes/api/productRoute.js
const express = require('express');
const router = express.Router();

// Product Model
const Product = require('../../models/Products');

// GET /api/products
// Get ALL products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({}).lean();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to fetch products' });
  }
});

// POST /api/products
// Create a product
router.post('/', async (req, res) => {
  try {
    const payload = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      quantity: req.body.quantity,
      photo: req.body.photo, // keep if your schema supports it
    };

    const product = await Product.create(payload);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message || 'Failed to create product' });
  }
});

// PUT /api/products/:id
// Update a product
router.put('/:id', async (req, res) => {
  try {
    const payload = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      quantity: req.body.quantity,
      photo: req.body.photo,
    };

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      payload,
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ error: 'Product not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message || 'Failed to update product' });
  }
});

// DELETE /api/products/:id
// Delete a product
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Product not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message || 'Failed to delete product' });
  }
});

module.exports = router;