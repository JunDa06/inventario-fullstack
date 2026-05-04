import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import ProductList from "./pages/ProductList";
import ProductForm from "./pages/ProductForm";
import Dashboard from "./pages/Dashboard";

function App() {
  const [productos, setProductos] = useState([]);

  // 🔥 API ficticia con categoría
  useEffect(() => {
    const productosFake = [
      { id: 1, nombre: "Laptop HP", categoria: "Laptop", precio: 2500, stock: 5 },
      { id: 2, nombre: "Teclado Redragon", categoria: "Teclado", precio: 150, stock: 10 },
      { id: 3, nombre: "Monitor Samsung", categoria: "Monitor", precio: 900, stock: 3 }
    ];

    setProductos(productosFake);
  }, []);

  // ➕ AGREGAR
  const agregarProducto = (producto) => {
    const nuevoProducto = {
      id: Date.now(),
      ...producto
    };
    setProductos([...productos, nuevoProducto]);
  };

  // ❌ ELIMINAR
  const eliminarProducto = (id) => {
    setProductos(productos.filter((p) => p.id !== id));
  };

  // ✏️ EDITAR
  const actualizarProducto = (productoActualizado) => {
    const nuevosProductos = productos.map((p) =>
      p.id === productoActualizado.id ? productoActualizado : p
    );
    setProductos(nuevosProductos);
  };

  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar />

        <div className="main-content">
          <h1 className="header">Inventario Tecnológico</h1>

          <Routes>
            <Route
              path="/dashboard"
              element={<Dashboard productos={productos} />}
            />

            <Route
              path="/"
              element={
                <ProductList
                  productos={productos}
                  eliminarProducto={eliminarProducto}
                />
              }
            />

            <Route
              path="/nuevo"
              element={<ProductForm agregarProducto={agregarProducto} />}
            />

            <Route
              path="/editar/:id"
              element={
                <ProductForm
                  productos={productos}
                  actualizarProducto={actualizarProducto}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;