const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const productRoutes = require("./routes/productRoutes");

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Conectado a MongoDB 🚀"))
  .catch((err) => console.error("Error de conexión:", err));

app.get("/", (req, res) => {
  res.send("API funcionando 🚀");
});

app.use("/api/productos", productRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});