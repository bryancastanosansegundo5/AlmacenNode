const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv'); 
const path = require('path'); // necesario para servir archivos estáticos

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());//middleware para JSON


const productosRouter = require('./routes/productos');
const categoriasRouter = require('./routes/categorias');

// Middleware para servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  })
app.use('/productos', productosRouter);
app.use('/categorias', categoriasRouter);

const PORT = process.env.PORT || 3000; 
const IP = process.env.IP || '127.0.0.1';
console.log(IP);

app.listen(PORT, IP, () => {
    console.log(`Servidor corriendo en http://${IP}:${PORT}`);
});