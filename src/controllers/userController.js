const bycrpt = require ('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user');
const dotenv = require('dotenv').config({ path: '../.env' });


const secretKey = process.env.SECRET_KEY


const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const hashpassword = await bycrpt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashpassword,
      role,
      createdAt: Date.now(),
      updatedAt: Date.now()
    });

    res.status(201).json({ message: 'Usuario creado exitosamente', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creando el usuario' });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error(error); // Imprime el error en la consola
    res.status(500).json({ error: 'Error obteniendo los usuarios' });
  }
};

const loginUser = async (req, res) => {
  try {
    const {email , password} = req.body;

    const user = await User.findOne({where: {email}});
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const passwordValid = await bycrpt.compare(password, user.password)
    if (!passwordValid) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    const token = jwt.sign({id: user.id, role: user.role}, secretKey, { expiresIn: '24h' });
    
    res.status(200).json({ message: 'Inicio de sesión exitoso', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error autenticando al usuario' });
  }
};


const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findByPk(userId, {attributes: ['id', 'name', 'email', 'role'] });

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error obteniendo el perfil del usuario' });
  }
};

module.exports = { createUser, getUsers, getProfile, loginUser };
