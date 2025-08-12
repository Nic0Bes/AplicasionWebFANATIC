const db = require('../../DB/mysql');

async function crearPedido(idCliente, items) {
    // 1. Calcular total
    let total = 0;
    items.forEach(item => {
        total += item.precio * item.cantidad;
    });

    // 2. Crear pedido
    const [pedidoResult] = await db.execute(
        'INSERT INTO Pedido (id_cliente, total) VALUES (?, ?)',
        [idCliente, total]
    );
    const idPedido = pedidoResult.insertId;

    // 3. Crear detalle pedido
    for (const item of items) {
        await db.execute(
            `INSERT INTO DetallePedido (id_pedido, id_producto, cantidad, precio_unitario)
             VALUES (?, ?, ?, ?)`,
            [idPedido, item.id_producto, item.cantidad, item.precio]
        );
    }

    return { idPedido, total };
}

async function verPedidos(idCliente) {
    const [pedidos] = await db.execute(
        'SELECT * FROM Pedido WHERE id_cliente = ?',
        [idCliente]
    );
    return pedidos;
}

async function verDetallePedido(idPedido) {
    const [detalles] = await db.execute(
        `SELECT p.nombre, dp.cantidad, dp.precio_unitario
         FROM DetallePedido dp
         JOIN Producto p ON dp.id_producto = p.id_producto
         WHERE dp.id_pedido = ?`,
        [idPedido]
    );
    return detalles;
}

module.exports = {
    crearPedido,
    verPedidos,
    verDetallePedido
};

