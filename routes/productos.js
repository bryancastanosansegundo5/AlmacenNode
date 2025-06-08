const express = require('express');
const router = express.Router();
const productosController = require("../controllers/productosController")

//Rutas
router.get('/all',productosController.getProductos);
router.get('/',productosController.getTodo);
router.post("/",productosController.createProductos);
router.delete("/:id",productosController.borrarProductos);
router.put("/:id",productosController.putProductos);


module.exports = router;