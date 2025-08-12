function verificarRol(...rolesPermitidos) {
    return (req, res, next) => {
        const rolUsuario = req.usuario?.rol;

        if (!rolesPermitidos.includes(rolUsuario)) {
            return res.status(403).json({
                error: true,
                status: 403,
                body: 'Acceso denegado: rol no autorizado'
            });
        }

        next();
    };
}

module.exports = verificarRol;

const auth = require('./auth');



router.post('/productos',
    verificarToken,
    verificarRol('empleado'), // solo empleados
    async (req, res) => {
        // lógica para crear producto
    }
);
