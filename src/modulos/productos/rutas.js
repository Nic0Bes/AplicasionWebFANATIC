const express = require('express');
const router = express.Router();

const controladorProducto = require('./controladorProducto');

// Define tus rutas aquí
router.get('/', (req, res) => {
    res.send('Respondiendo desde productos');
});

router.post('/', (req, res) => {
    // Lógica para crear un producto
});


router.get('/', controladorProducto.listarProductos);
router.get('/:id', controladorProducto.obtenerProducto);
router.post('/', controladorProducto.crearProducto);
router.put('/:id', controladorProducto.actualizarProducto);
router.delete('/:id', controladorProducto.eliminarProducto);

module.exports = router;




router.get('/buscar', controladorProducto.buscarProductos);
router.get('/categoria/:categoria', controladorProducto.listarPorCategoria);   
