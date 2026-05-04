const express = require("express");
const router = express.Router();
const Producto = require("../models/Product");

// 🔥 GET - obtener todos (con filtro opcional por categoría)
router.get("/", async (req, res) => {
  try {
    const { categoria } = req.query;

    let filtro = {};
    if (categoria) {
      filtro.categoria = categoria;
    }

    const productos = await Producto.find(filtro);
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener productos" });
  }
});

// 🔥 POST - crear (con validación)
router.post("/", async (req, res) => {
  try {
    const { nombre, categoria, precio, stock } = req.body;

    // ✅ VALIDACIÓN BACKEND
    if (!nombre || !categoria || precio <= 0 || stock < 0) {
      return res.status(400).json({
        error: "Datos inválidos: verifica nombre, categoría, precio y stock"
      });
    }

    const nuevoProducto = new Producto({
      nombre,
      categoria,
      precio,
      stock
    });

    await nuevoProducto.save();

    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(500).json({ error: "Error al crear producto" });
  }
});

// 🔥 PUT - actualizar (con validación)
router.put("/:id", async (req, res) => {
  try {
    const { nombre, categoria, precio, stock } = req.body;

    if (!nombre || !categoria || precio <= 0 || stock < 0) {
      return res.status(400).json({
        error: "Datos inválidos"
      });
    }

    const producto = await Producto.findByIdAndUpdate(
      req.params.id,
      { nombre, categoria, precio, stock },
      { new: true }
    );

    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json(producto);
  } catch (error) {
    res.status(400).json({ error: "Error al actualizar producto" });
  }
});

// 🔥 DELETE - eliminar
router.delete("/:id", async (req, res) => {
  try {
    const producto = await Producto.findByIdAndDelete(req.params.id);

    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json({ mensaje: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(400).json({ error: "Error al eliminar producto" });
  }
});

module.exports = router;