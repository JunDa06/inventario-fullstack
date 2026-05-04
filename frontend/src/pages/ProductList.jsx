import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";
import ProductCard from "../components/ProductCard";

function ProductList({ eliminarProducto }) {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  const obtenerProductos = async () => {
    try {
      const res = await api.get("/productos");
      setProductos(res.data);
    } catch (error) {
      console.error("Error al obtener productos", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  if (loading) return <p>Cargando...</p>;

  return (
    <div>
      <h2>📦 Productos</h2>

      <Link to="/nuevo">
        <button>+ Nuevo Producto</button>
      </Link>

      {productos.length === 0 ? (
        <p>No hay productos</p>
      ) : (
        <div className="product-grid">
          {productos.map((producto) => (
            <ProductCard
              key={producto._id}
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