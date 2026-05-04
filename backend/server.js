const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// 🔥 Middlewares
app.use(cors());
app.use(express.json());

// 🔥 Importar rutas
const productRoutes = require("./routes/productRoutes");

// 🔥 Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Conectado a MongoDB 🚀"))
  .catch((err) => console.error("Error de conexión:", err));

// 🔥 Ruta base
app.get("/", (req, res) => {
  res.send("API funcionando 🚀");
});

// 🔥 Rutas del CRUD
app.use("/api/productos", productRoutes);

// 🔥 Puerto
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});