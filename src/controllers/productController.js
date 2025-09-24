const Product = require('../models/productModel');

// @desc    Obtener todos los productos
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('category'); // Usa populate para traer los datos de la categoría
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los productos', error: error.message });
  }
};

// @desc    Obtener un producto por ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category');
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el producto', error: error.message });
  }
};

// @desc    Crear un nuevo producto
// @route   POST /api/products
// @access  Private (requiere autenticación)
const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category } = req.body;
    const newProduct = new Product({
      name,
      description,
      price,
      stock,
      category,
    });
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el producto', error: error.message });
  }
};

// @desc    Actualizar un producto
// @route   PUT /api/products/:id
// @access  Private (requiere autenticación)
const updateProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, price, stock, category },
      { new: true, runValidators: true } // 'new: true' devuelve el documento actualizado
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el producto', error: error.message });
  }
};

// @desc    Eliminar un producto
// @route   DELETE /api/products/:id
// @access  Private (requiere autenticación)
const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json({ message: 'Producto eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el producto', error: error.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
