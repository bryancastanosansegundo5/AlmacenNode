const db = require("../config/db");
// si falla verificar que el usuario indicado en db.js existe
// funcion controladora de todos los productos
// const getProductos = async (req, res) => {
//   try {
//     const [productos, campos] = await db.query("SELECT * FROM productos");
//     console.log(campos);
//     res.json(productos);
//   } catch (error) {
//     res.status(500).json({ error: "Error al obtener los datos" });
//   }
// };
const getProductos = async (req, res) => {
  try {
    // let limit = parseInt(req.query.limit) || 10; // Cantidad de productos por página (por defecto 10)
    // let offset = parseInt(req.query.offset) || 0; // Desde dónde empezar

    // const [productos] = await db.query(
    //   "SELECT * FROM productos LIMIT ? OFFSET ?",
    //   [limit, offset]
    // );

    // Contar el total de productos
    // const [[{ total }]] = await db.query("SELECT COUNT(*) as total FROM productos");

    // res.json({
    //   productos, // Lista de productos paginados
    //   total,     // Total de productos en la base de datos
    //   limit,
    //   offset
    // });
    const [productos, campos] = await db.query("SELECT * FROM productos");
    console.log(campos);
    res.json(productos)
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los datos" });
  }
};

// funcion para agregar un producto
const createProductos = async (req, res) => {
  const { nombre, precio, id_cat } = req.body;
  if (!nombre) {
    return res.status(400).json({ error: 'El campo "nombre" es obligatorio.' });
  }

  if (!id_cat) {
    return res.status(400).json({ error: "La categoria es obligatoria." });
  }
  try {
    const [result] = await db.query(
      "INSERT INTO productos (nombre , precio,id_cat) VALUES (?,?,?)",
      [nombre, precio, id_cat]
    );
    console.log(result);
    res
      .status(200)
      .json({
        id: result.insertId,
        nombre,
        precio,
        id_cat,
        mensaje: "Producto agregado correctamente",
      });
  } catch (error) {
    res.status(500).json({ error, mensaje: "Fallo en la operacion" });
  }
};

const borrarProductos = async (req, res) => {
  const id = req.params.id;
  console.log("Estas es la id: " + id);

  try {
    const [result] = await db.query("DELETE FROM productos WHERE id = ?", [id]);

    if (result.affectedRows == 0) {
      return res.status(400).json({ error: "El id no existe" });
    }

    res.status(200).json({ id: result });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getProductoById = async (req, res) => {};
const getTodo = async (req, res) => {
  if (req.query.nombre) {
    //http://localhost:4000/productos?nombre=qwe

    try {
      const nombre = req.query.nombre; 
      if (!nombre) {
        return res.status(400).json({ error: "Nombre no proporcionado" });
      }
      // si sobreescribo la variable, daba fallo
      const nombreBusqueda = `%${nombre}%`;
      const [productos] = await db.query(
        "SELECT * FROM productos WHERE nombre LIKE ?",
        [nombreBusqueda]
      );
      if (productos.length === 0) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }
      console.log(productos.length);

      res.json(productos);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener el producto" });
    }
  } else if (req.query.id) {
    //http://localhost:4000/productos?id=2
    try {
      const id = req.query.id; // Leer el ID de la query string POR query
      console.log(id);

      if (!id) {
        return res.status(400).json({ error: "ID no proporcionado" });
      }
      const [producto] = await db.query(
        "SELECT * FROM productos WHERE id = ?",
        [id]
      );
      if (producto.length === 0) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }
      res.json(producto[0]);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener el producto" });
    }
  } else {
    return res.status(400).json({ error: "Parametro no proporcionado" });
  }
};
const putProductos = async (req, res) => {
  const id = req.params.id;
  const { nombre, precio, id_cat } = req.body;
  console.log(
    "Estas es la id: " +
      id +
      " Nombre " +
      nombre +
      " Precio " +
      precio +
      " Categoria " +
      id_cat
  );

  try {
    const [result] = await db.query(
      "UPDATE productos SET nombre = ?, precio = ?, id_cat=? WHERE id = ?",
      [nombre, precio, id_cat, id]
    );
    console.log(result);

    if (result.affectedRows == 0) {
      return res.status(400).json({ error: "El id no existe" });
    }
    res.status(200).json({
      id: result,
      nombre,
      precio,
      id_cat,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getProductos,
  createProductos,
  borrarProductos,
  getProductoById,
  putProductos,
  getTodo,
};
