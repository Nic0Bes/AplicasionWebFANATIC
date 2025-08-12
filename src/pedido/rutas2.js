const express = require('express');
const router = express.Router();
const controlador = require('./controlador');
const verificarToken = require('../../middleware/auth');

// Confirmar pedido desde frontend (con productos y cantidades)
router.post('/', verificarToken, async (req, res) => {
    const idCliente = req.usuario.id;
    const items = req.body.items; // array de {id_producto, cantidad, precio}

    const pedido = await controlador.crearPedido(idCliente, items);
    res.status(201).json({ mensaje: 'Pedido realizado', pedido });
});

router.get('/', verificarToken, async (req, res) => {
    const pedidos = await controlador.verPedidos(req.usuario.id);
    res.status(200).json(pedidos);
});

router.get('/:id', verificarToken, async (req, res) => {
    const detalles = await controlador.verDetallePedido(req.params.id);
    res.status(200).json(detalles);
});

module.exports = router;
