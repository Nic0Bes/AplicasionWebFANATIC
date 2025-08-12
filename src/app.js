import express from 'express';
import config from './config.js'; // <- Se añade la extensión .js
import clientes from './modulos/red/rutas.js'; // <- Se asume que también se migra
import productos from './modulos/productos/rutas.js'; // <- Se asume que también se migra

const app = express();

app.use(express.json());
app.set('port', config.app.port);

app.use('/clientes', clientes);
app.use('/productos', productos);


console.log('tipo:', typeof productos);

app.use('/productos', productos);

// Middleware para manejar errores
app.use((err, req, res, next) => {
  console.error('[ERROR]', err);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Error interno del servidor';
  
  res.status(statusCode).json({
    error: true,
    message: message
  });
});

export default app;