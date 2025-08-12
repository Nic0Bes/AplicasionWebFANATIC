const jwt = require('jsonwebtoken');


require('dotenv').config();

const bcrypt = require('bcrypt');

const express = require ('express');

const respuesta= require ('./respuestas');

const controlador = require('../clientes/controlador');

const router = express.Router();


const verificarToken = require('../../middleware/auth');

router.post('/login', async function (req, res) {
    try {
        const { correo_electronico, contraseña } = req.body;

        const cliente = await controlador.buscarPorCorreo(correo_electronico);

        if (!cliente) {
            return respuesta.error(req, res, 'Correo no registrado', 404);
        }

        const esValida = await bcrypt.compare(contraseña, cliente.contraseña);

        if (!esValida) {
            return respuesta.error(req, res, 'Contraseña incorrecta', 401);
        }

        // Opcional: agregar JWT más adelante

const token = jwt.sign(
  {
    id: cliente.id_cliente,
    nombre: cliente.nombre,
    correo: cliente.correo_electronico,
    rol: cliente.rol // 👈 Agregado
  },
  process.env.JWT_SECRET,
  { expiresIn: '1h' }
);

respuesta.success(req, res, {
  mensaje: 'Login exitoso',
  token
}, 200);


    } catch (err) {
        console.error('[ERROR EN LOGIN]', err);
        respuesta.error(req, res, 'Error al intentar iniciar sesión', 500);
    }
});
;

router.get('/', async function (req, res){
    try {
        const todos = await controlador.todos();
        respuesta.success(req, res, todos, 200);
    } catch (err) {
        respuesta.error(req, res, 'Error al obtener los datos', 500);
    }
});
router.post('/', async function (req, res) {
    try {
        const nuevoCliente = await controlador.agregar(req.body);
        console.log('Nuevo cliente agregado:', nuevoCliente);
        respuesta.success(req, res, 'Cliente agregado correctamente', 201);
    } catch (err) {
        console.error('[ERROR AL AGREGAR CLIENTE]', err.sqlMessage || err.message || err);
        respuesta.error(req, res, 'Error al agregar el cliente', 500);
    }
});
router.get('/:id', async function (req, res) {
    try {
        const id = req.params.id;
        const cliente = await controlador.uno(id);
        if (!cliente) {
            return respuesta.error(req, res, 'Cliente no encontrado', 404);
        }
        respuesta.success(req, res, cliente, 200);
    } catch (err) {
        console.error('[ERROR AL OBTENER CLIENTE POR ID]', err.sqlMessage || err.message || err);
        respuesta.error(req, res, 'Error al obtener cliente', 500);
    }
});

router.put('/:id', verificarToken, async function (req, res) {
    try {
        const idToken = req.usuario.id;           // viene del JWT
        const idParam = parseInt(req.params.id);  // viene de la URL

        if (idToken !== idParam) {
            return respuesta.error(req, res, 'No autorizado para modificar este cliente', 403);
        }

        const nuevosDatos = req.body;
        const resultado = await controlador.actualizar(idParam, nuevosDatos);

        if (resultado.affectedRows === 0) {
            return respuesta.error(req, res, 'Cliente no encontrado', 404);
        }

        respuesta.success(req, res, 'Cliente actualizado correctamente', 200);
    } catch (err) {
        console.error('[ERROR AL ACTUALIZAR CLIENTE]', err.message || err);
        respuesta.error(req, res, 'Error al actualizar cliente', 500);
    }
});

router.delete('/:id', verificarToken, async function (req, res) {
    try {
        const idToken = req.usuario.id;
        const idParam = parseInt(req.params.id);

        if (idToken !== idParam) {
            return respuesta.error(req, res, 'No autorizado para eliminar este cliente', 403);
        }

        const resultado = await controlador.eliminar(idParam);

        if (resultado.affectedRows === 0) {
            return respuesta.error(req, res, 'Cliente no encontrado', 404);
        }

        respuesta.success(req, res, 'Cliente eliminado correctamente', 200);
    } catch (err) {
        if (err.code === 'ER_ROW_IS_REFERENCED_2') {
            return respuesta.error(
                req,
                res,
                'No se puede eliminar el cliente porque tiene registros relacionados',
                400
            );
        }

        console.error('[ERROR AL ELIMINAR CLIENTE]', err.sqlMessage || err.message || err);
        respuesta.error(req, res, 'Error al eliminar cliente', 500);
    }
});


router.get('/perfil', verificarToken, (req, res) => {
    const usuario = req.usuario; // info del token

    res.status(200).json({
        error: false,
        status: 200,
        body: {
            mensaje: 'Acceso permitido al perfil',
            usuario
        }
    });
});



module.exports = router; 








