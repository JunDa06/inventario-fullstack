const express = require("express");
const router = express.Router();
const Producto = require("../models/Product");

// 🔥 GET - obtener todos
router.get("/", async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener productos" });
  }
});

// 🔥 POST - crear
router.post("/", async (req, res) => {
  try {
    const nuevoProducto = new Producto(req.body);
    await nuevoProducto.save();
    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(400).json({ error: "Error al crear producto" });
  }
});

// 🔥 PUT - actualizar
router.put("/:id", async (req, res) => {
  try {
    const producto = await Producto.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(producto);
  } catch (error) {
    res.status(400).json({ error: "Error al actualizar" });
  }
});

// 🔥 DELETE - eliminar
router.delete("/:id", async (req, res) => {
  try {
    await Producto.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Producto eliminado" });
  } catch (error) {
    res.status(400).json({ error: "Error al eliminar" });
  }
});

module.exports = router;