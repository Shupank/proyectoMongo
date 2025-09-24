const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./db/conexion');
const productRoutes = require('./src/routes/productRoute');
const categoryRoutes = require('./src/routes/categoryRoute');

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
