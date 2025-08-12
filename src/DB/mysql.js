require('dotenv').config();
const mysql = require('mysql2');
const config = require('../config');

const dbconfig = { 
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
};


let conexion;

function conmysql() {
    conexion = mysql.createConnection(dbconfig);

    conexion.connect((err) => {
        if (err) {
            console.log(['DB Error'], err);
            setTimeout(conmysql, 200);
        } else {
            console.log(' Conectado a la base de datos MySQL');
        }
    });

    // 💡 Este bloque debe ir aquí dentro
    conexion.on('error', (err) => {
        console.log(['DB Error'], err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            conmysql(); // reconectar
        } else {
            throw err;
        }
    });
}

conmysql(); // 👈 No olvides llamar a la función para iniciar la conexión








function todos(tabla){
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla}`, (err, resultados) => {
            if (err) return reject(err);
            resolve(resultados);
        });
    });
}


function uno(tabla, id) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM \`${tabla}\` WHERE id_cliente = ?`;
        conexion.query(sql, [id], (err, result) => {
            if (err) {
                console.error('[ERROR EN MYSQL SELECT UNO]', err);
                return reject(err);
            }
            resolve(result[0]); // solo uno
        });
    });
}

function agregar(tabla, data) {
    return new Promise((resolve, reject) => {
        const columnas = Object.keys(data).join(', ');
        const valores = Object.values(data);
        const placeholders = valores.map(() => '?').join(', ');
        const sql = `INSERT INTO \`${tabla}\` (${columnas}) VALUES (${placeholders})`;

        conexion.query(sql, valores, (err, result) => {
            if (err) {
                console.error('[ERROR EN MYSQL INSERT]', err);
                return reject(err);
            }
            resolve(result);
        });
    });
}


function eliminar(tabla, id) {
    return new Promise((resolve, reject) => {
        const sql = `DELETE FROM \`${tabla}\` WHERE id_cliente = ?`;

        conexion.query(sql, [id], (err, result) => {
            if (err) {
                console.error('[ERROR EN MYSQL DELETE]', err);
                return reject(err);
            }
            resolve(result);
        });
    });
}




function actualizar(tabla, id, data) {
    return new Promise((resolve, reject) => {
        const columnas = Object.keys(data).map(col => `${col} = ?`).join(', ');
        const valores = Object.values(data);
        valores.push(id);

        const sql = `UPDATE \`${tabla}\` SET ${columnas} WHERE id_cliente = ?`;

        conexion.query(sql, valores, (err, result) => {
            if (err) {
                console.error('[ERROR EN MYSQL UPDATE]', err);
                return reject(err);
            }
            resolve(result);
        });
    });
}

function buscarPorCampo(tabla, campo, valor) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM \`${tabla}\` WHERE \`${campo}\` = ? LIMIT 1`;
        conexion.query(sql, [valor], (err, result) => {
            if (err) {
                console.error('[ERROR EN MYSQL BUSCAR]', err);
                return reject(err);
            }
            resolve(result[0]);
        });
    });
}


module.exports = {
    todos,
    uno,
    agregar,
    eliminar,
    actualizar,
    buscarPorCampo,
};
