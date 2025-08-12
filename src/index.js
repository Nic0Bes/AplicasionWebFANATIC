import 'dotenv/config';
import app from './app.js'; // <- Se añade la extensión .js

app.listen(app.get('port'), () => {
    console.log('Servidor escuchando en el puerto', app.get('port'));
});