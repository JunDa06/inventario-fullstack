import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";
import ProductCard from "../components/ProductCard";

function ProductList() {
  const [productos, setProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("");

  const obtenerProductos = async () => {
    try {
      setError("");
      const res = await api.get("/productos");
      setProductos(res.data);
      setProductosFiltrados(res.data);
    } catch (error) {
      const mensaje =
        error.response?.data?.error || "Error al cargar productos";
      setError(mensaje);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  useEffect(() => {
    let resultado = productos;

    if (busqueda) {
      resultado = resultado.filter((p) =>
        p.nombre.toLowerCase().includes(busqueda.toLowerCase())
      );
    }

    if (categoria) {
      resultado = resultado.filter((p) => p.categoria === categoria);
    }

    setProductosFiltrados(resultado);
  }, [busqueda, categoria, productos]);

  if (loading) return <p>Cargando productos...</p>;

  return (
    <div>
      <h2>📦 Productos</h2>

      {/* ERROR */}
      {error && <p className="error">{error}</p>}

      {/* BUSCADOR */}
      <input
        type="text"
        placeholder="Buscar producto..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      {/* FILTRO CATEGORÍA */}
      <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
        <option value="">Todas las categorías</option>
        <option value="Laptop">Laptop</option>
        <option value="Teclado">Teclado</option>
        <option value="Monitor">Monitor</option>
        <option value="Accesorio">Accesorio</option>
        <option value="Dispositivo móvil">Dispositivo móvil</option>
      </select>

      <Link to="/nuevo">
        <button>+ Nuevo Producto</button>
      </Link>

      {productosFiltrados.length === 0 ? (
        <p>No hay productos</p>
      ) : (
        <div className="product-grid">
          {productosFiltrados.map((producto) => (
            <ProductCard key={producto._id} producto={producto} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;