// controladorProducto.js

const db = require('../../DB/mysql');

const TABLA= 'Producto';

exports.crearProducto = async (req, res) => {
  try {
    const {
      nombre,
      descripcion,
      precio,
      stock,
      talla,
      estado,
      porcentaje_oferta,
      tiene_oferta
    } = req.body;

    const sql = `
      INSERT INTO productos 
      (nombre, descripcion, precio, stock, talla, estado, porcentaje_oferta, tiene_oferta)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const valores = [nombre, descripcion, precio, stock, talla, estado, porcentaje_oferta, tiene_oferta];

    await db.execute(sql, valores);

    res.status(201).json({ mensaje: 'Producto creado en la base de datos' });
  } catch (error) {
    console.error('Error al crear producto:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};


exports.listarProductos = (req, res) => {
  // Lógica para listar productos
  res.send('Lista de productos');
};

exports.obtenerProducto = (req, res) => {
  // Lógica para obtener un producto por id
  const id = req.params.id;
  res.send(`Producto con id ${id}`);
};

const [dbName] = await db.query('SELECT DATABASE() as db');
console.log('Base de datos activa:', dbName[0].db);


exports.crearProducto = (req, res) => {
  // Lógica para crear producto
  res.send('Producto creado');
};

exports.actualizarProducto = (req, res) => {
  const id = req.params.id;
  res.send(`Producto ${id} actualizado`);
};

exports.eliminarProducto = (req, res) => {
  const id = req.params.id;
  res.send(`Producto ${id} eliminado`);
};
