const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Función auxiliar para generar un token JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
};

// @desc    Registrar un nuevo usuario
// @route   POST /api/users/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'El usuario con este email ya existe' });
    }

    const newUser = new User({
      name,
      email,
      password,
    });

    const savedUser = await newUser.save();

    res.status(201).json({
      _id: savedUser._id,
      name: savedUser.name,
      email: savedUser.email,
      token: generateToken(savedUser._id),
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar el usuario', error: error.message });
  }
};

// @desc    Autenticar un usuario y obtener token
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Credenciales inválidas' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión', error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
