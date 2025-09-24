const Category = require('../models/categoryModel');

// @desc    Obtener todas las categorías
// @route   GET /api/categories
// @access  Public
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las categorías', error: error.message });
  }
};

// @desc    Crear una nueva categoría
// @route   POST /api/categories
// @access  Private (requiere autenticación)
const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newCategory = new Category({ name, description });
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la categoría', error: error.message });
  }
};

// @desc    Actualizar una categoría
// @route   PUT /api/categories/:id
// @access  Private (requiere autenticación)
const updateCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true, runValidators: true }
    );
    if (!updatedCategory) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la categoría', error: error.message });
  }
};

// @desc    Eliminar una categoría
// @route   DELETE /api/categories/:id
// @access  Private (requiere autenticación)
const deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    if (!deletedCategory) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }
    res.status(200).json({ message: 'Categoría eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la categoría', error: error.message });
  }
};

module.exports = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
