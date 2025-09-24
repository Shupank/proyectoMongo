const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Cargar variables de entorno desde .env
dotenv.config();

// Inicializar Express
const app = express();

// Middleware
app.use(express.json()); // Para parsear JSON en las peticiones
app.use(cors()); // Habilitar CORS

// Conexión a la base de datos
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Conexión a MongoDB exitosa.');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
    process.exit(1); // Salir del proceso si hay un error de conexión
  }
};
connectDB();

// Importar y usar rutas
const productRoutes = require('./src/routes/productRoute');
const categoryRoutes = require('./src/routes/categoryRoute');
const userRoutes = require('./src/routes/userRoute');

app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/users', userRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API CRUD de Productos, Categorías y Usuarios en funcionamiento.');
});

// Definir el puerto y arrancar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
