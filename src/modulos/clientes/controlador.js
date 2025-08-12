const db = require('../../DB/mysql');
const bcrypt = require('bcrypt');

const TABLA = 'Cliente';

async function agregar(data) {
    const saltRounds = 10;
    const hash = await bcrypt.hash(data.contraseña, saltRounds);
    data.contraseña = hash;
    return db.agregar(TABLA, data);
}

function todos() {
    return db.todos(TABLA);
}

function uno(id) {
    return db.uno(TABLA, id);
}

function actualizar(id, data) {
    return db.actualizar(TABLA, id, data);
}

function eliminar(id) {
    return db.eliminar(TABLA, id);
}

function buscarPorCorreo(correo) {
    return db.buscarPorCampo(TABLA, 'correo_electronico', correo);
}


module.exports = {
    todos,
    agregar,
    uno,
    actualizar,
    eliminar,
    buscarPorCorreo,
};
