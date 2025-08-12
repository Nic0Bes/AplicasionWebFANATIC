const express = require('express');
const router = express.Router();
const carrito = require('./controlador');
const verificarToken = require('../../middleware/auth');

router.post('/crear', verificarToken, async (req, res) => {
    const idCliente = req.usuario.id;
    const idCarrito = await carrito.crearCarrito(idCliente);
    res.status(201).json({ mensaje: 'Carrito creado', idCarrito });
});

router.post('/:idCarrito/productos', verificarToken, async (req, res) => {
    const { idProducto, cantidad } = req.body;
    await carrito.agregarProducto(req.params.idCarrito, idProducto, cantidad);
    res.status(201).json({ mensaje: 'Producto agregado al carrito' });
});

router.get('/:idCarrito', verificarToken, async (req, res) => {
    const items = await carrito.verCarrito(req.params.idCarrito);
    res.status(200).json(items);
});

module.exports = router;
