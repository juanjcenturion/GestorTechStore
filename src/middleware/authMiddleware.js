const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config({ path: '../.env' });

const secretKey = process.env.SECRET_KEY

const auth = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extrae el token
    console.log("Token enviado:", token);
    
    if (!token) {
        return res.status(403).json({ error: 'Token no proporcionado' });
    }

    console.log("Clave secreta:", secretKey); // Verifica la clave secreta

    jwt.verify(token, secretKey, (error, decoded) => {
        if (error) {
            console.error("Error al verificar el token:", error.message); // Mensaje de error
            return res.status(401).json({ error: 'Token incorrecto' });
        }

        console.log("Token decodificado:", decoded); // Imprime el token decodificado
        req.user = decoded;
        
        next();
    });
};

module.exports = auth;