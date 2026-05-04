import { useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

function ProductList({ productos, eliminarProducto }) {
  const [busqueda, setBusqueda] = useState("");

  // 🔍 Filtrar productos
  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div>
      <h2>📦 Productos</h2>

      {/* 🔍 BUSCADOR */}
      <input
        type="text"
        placeholder="Buscar producto..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      {/* ➕ BOTÓN */}
      <Link to="/nuevo">
        <button>+ Nuevo Producto</button>
      </Link>

      {/* 📦 LISTA */}
      {productosFiltrados.length === 0 ? (
        <p>No se encontraron productos</p>
      ) : (
        <div className="product-grid">
          {productosFiltrados.map((producto) => (
            <ProductCard
              key={producto.id}
              producto={producto}
              eliminarProducto={eliminarProducto}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;