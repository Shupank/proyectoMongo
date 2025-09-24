const express = require('express');
const {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/categoryController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

// Rutas públicas
router.get('/', getCategories);

// Rutas protegidas
router.post('/', protect, createCategory);
router.put('/:id', protect, updateCategory);
router.delete('/:id', protect, deleteCategory);

module.exports = router;
