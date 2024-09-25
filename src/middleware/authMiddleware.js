const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config({ path: '../.env' });

const secretKey = process.env.SECRET_KEY

const auth = (req, res, next) => {
    const token = req.headers['authorization'];
    
    if(!token) {
        return res.status(403).json({ error: 'Token no proporcionado' });
    };

    jwt.verify(token, secretKey, (error, decoded) => {
        if (error) {
            return res.status(401).json({error: 'Token incorrecto'})
        }

        req.user = decoded;
        next();
    });

};

module.exports = auth;