
const authRole = (role) => {
    return (req, res, next) => {
        if (!req.user.role != role) {
            return res.status(403).json({ message: 'Acceso denegado. Permisos insuficientes.' });
        }
        next();   
    }
}