// Cargar variables de entorno desde el archivo .env
require('dotenv').config();
const mysql= require("mysql2");

// Crear pool de conexiones con las variables de entorno
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Al final del archivo app.js o donde gestionas la conexión
process.on('SIGINT', () => {   //cierra la conexión bd al cerrar la app del servidor
    console.log('Cerrando conexiones a la base de datos...');
    pool.end(() => {
        console.log('Conexiones cerradas');
        process.exit(0); // Cierra la aplicación
    });
});

module.exports = pool.promise(); // Exportamos la conexión