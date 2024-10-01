const { DataTypes } = require('sequelize');
const sequelize = require('../models/index').sequelize;
const bcrypt = require('bcrypt'); // Corrige el nombre de la librería
const jwt = require('jsonwebtoken');
const {User, Role} = require('../models/index')
const dotenv = require('dotenv').config({ path: '../.env' });

const secretKey = process.env.SECRET_KEY;

const createUser = async (req, res) => {
  try {
    const { name, email, password, roleId } = req.body;

    // Asegúrate de que el password sea válido
    if (!name || !email || !password || !roleId) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashPassword,
      roleId: parseInt(roleId),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    res.status(201).json({ message: 'Usuario creado exitosamente', user });
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    res.status(500).json({ error: 'Error creando el usuario' });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: {
        model: Role,
        as: 'role', 
        attributes: ['roleName'],
      },
    });
    res.status(200).json(users);
  } catch (error) {
    console.error('Error obteniendo los usuarios:', error);
    res.status(500).json({ error: 'Error obteniendo los usuarios' });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email }, include: 'role' });
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    // Inclusion del rol
    const token = jwt.sign({ id: user.id, role: user.role.roleName }, secretKey, { expiresIn: '24h' });

    res.status(200).json({ message: 'Inicio de sesión exitoso', token });
  } catch (error) {
    console.error('Error autenticando al usuario:', error);
    res.status(500).json({ error: 'Error autenticando al usuario' });
  }
};

const getProfile = async (req, res) => {
  try {
    const userId = req.user.id; 
    const user = await User.findByPk(userId, {
      attributes: ['id', 'name', 'email'],
      include: {
        model: Role,
        as: 'role', 
        attributes: ['roleName'],
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error obteniendo el perfil del usuario:', error);
    res.status(500).json({ error: 'Error obteniendo el perfil del usuario' });
  }
};

module.exports = { createUser, getUsers, getProfile, loginUser };
