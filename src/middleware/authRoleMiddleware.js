const { DataTypes } = require('sequelize');
const sequelize = require('../models/index').sequelize;
const {User, Role} = require('../models/index');



const authRole = (requiredRole) => {
    return async (req, res, next) => {
        try {
            const userId = req.user.id;
            
        
            // Obtener el usuario junto con su rol
            const user = await User.findByPk(userId, {
                include: [{ model: Role, as: 'role' }]
            })
            
        
            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }
    
            
            // Verificar que el rol exista
            if (user && user.role) {
                const userRole = user.role.roleName;
                if (userRole !== requiredRole) {
                    return res.status(403).json({ message: 'Acceso denegado. Permisos insuficientes.' });
                }
            } else {
                return res.status(403).json({ message: 'Rol no encontrado para el usuario.' });
            }
        
            console.log('authRole')
            next();

        } catch (error) {
            console.error('Error al verificar el rol del usuario:', error);
            return res.status(500).json({ message: 'Error interno del servidor' });
        }
    };
};

module.exports = authRole;
