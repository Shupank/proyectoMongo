const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  // Relación con la categoría
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category', // Referencia al modelo 'Category'
    required: true,
  },
}, {
  timestamps: true, // Agrega 'createdAt' y 'updatedAt'
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
