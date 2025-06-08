const express = require('express');
const router = express.Router();
const categoriasController = require("../controllers/categoriasController")

//Rutas
router.get('/all',categoriasController.getCategorias);
router.get('/',categoriasController.getCategoriasById);
router.post("/",categoriasController.createCategorias);
router.delete("/:id",categoriasController.borrarCategorias);
router.put("/:id",categoriasController.putCategorias);


module.exports = router;