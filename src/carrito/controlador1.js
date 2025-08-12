const db = require('../../DB/mysql');

async function crearCarrito(idCliente) {
    const sql = 'INSERT INTO Carrito (id_cliente) VALUES (?)';
    const [result] = await db.execute(sql, [idCliente]);
    return result.insertId;
}

async function agregarProducto(idCarrito, idProducto, cantidad) {
    const sql = `
        INSERT INTO DetalleCarrito (id_carrito, id_producto, cantidad)
        VALUES (?, ?, ?)
    `;
    return db.execute(sql, [idCarrito, idProducto, cantidad]);
}

async function verCarrito(idCarrito) {
    const sql = `
        SELECT p.nombre, dc.cantidad, p.precio
        FROM DetalleCarrito dc
        JOIN Producto p ON dc.id_producto = p.id_producto
        WHERE dc.id_carrito = ?
    `;
    const [result] = await db.execute(sql, [idCarrito]);
    return result;
}

module.exports = {
    crearCarrito,
    agregarProducto,
    verCarrito
};
