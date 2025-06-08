const Categoria = require("../models/Categorias");
const db = require("../config/db");

const getCategorias = async (req, res) => {
  try {
    const [datos] = await db.query("SELECT * FROM categorias");
    // console.log(campos);
    res.json(datos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los datos" });
  }
};
const getCategoriasById = async (req, res) => {
  //http://localhost:4000/productos?id=2
  try {
    const id = req.query.id; // Leer el ID de la query string POR query

    if (!id) {
      return res.status(400).json({ error: "ID no proporcionado" });
    }
    const [categoria] = await db.query(
      "SELECT * FROM categorias WHERE id = ?",
      [id]
    );
    if (categoria.length === 0) {
      return res.status(404).json({ error: "Categoria no encontrado" });
    }
    res.json(categoria[0]);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el categoria" });
  }
};

// funcion para agregar un producto
const createCategorias = async (req, res) => {
  const { nombre } = req.body;
  if (!nombre) {
    return res.status(400).json({ error: 'El campo "nombre" es obligatorio.' });
  }

  try {
    const [result] = await db.query(
      "INSERT INTO categorias (nombre) VALUES (?)",
      [nombre]
    );
    console.log(result);
    res.status(200).json({ id: result.insertId, nombre });
  } catch (error) {
    res.status(500).json(error);
   
  }
};

const borrarCategorias = async (req, res) => {
  const id = req.params.id;

  try {
    const [result] = await db.query("DELETE FROM categorias WHERE id = ?", [id]);

    if (result.affectedRows == 0) {
      return res.status(400).json({ error: "El id no existe" });
    }

    res.status(200).json({ id: result });
  } catch (error) {
    res.status(500).json(error);
  }
};

const putCategorias = async (req, res) => {
  const id = req.params.id;
  const { nombre } = req.body;

  try {
    const [result] = await db.query(
      "UPDATE categorias SET nombre = ? WHERE id = ?",
      [nombre,id]
    );
    console.log(result);

    if (result.affectedRows == 0) {
      return res.status(400).json({ error: "El id no existe" });
    }
    res.status(200).json({
      id: result,
      nombre,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};


module.exports = {
  getCategorias,
  getCategoriasById,
  createCategorias,
  putCategorias,
  borrarCategorias
};