const jwt = require('jsonwebtoken');

function verificarToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            error: true,
            status: 401,
            body: 'Token no proporcionado',
        });
    }

    const token = authHeader.split(' ')[1]; // formato: Bearer <token>

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = decoded;
        next();
    } catch (err) {
        return res.status(401).json({
            error: true,
            status: 401,
            body: 'Token inválido o expirado',
        });
    }
}

module.exports = verificarToken;
