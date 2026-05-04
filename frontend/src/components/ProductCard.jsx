import { useNavigate } from "react-router-dom";

function ProductCard({ producto, eliminarProducto }) {
  const navigate = useNavigate();

  // 🔥 mapa de clases por categoría
  const getCategoriaClass = (categoria) => {
    switch (categoria) {
      case "Laptop":
        return "laptop";
      case "Teclado":
        return "teclado";
      case "Monitor":
        return "monitor";
      case "Accesorio":
        return "accesorio";
      case "Dispositivo móvil":
        return "movil";
      default:
        return "";
    }
  };

  return (
    <div className="card">
      <h3>{producto.nombre}</h3>

      {/* 🔥 BADGE DE CATEGORÍA */}
      <span className={`badge ${getCategoriaClass(producto.categoria)}`}>
        {producto.categoria}
      </span>

      <p><strong>Precio:</strong> S/. {producto.precio}</p>
      <p><strong>Stock:</strong> {producto.stock}</p>

      <button onClick={() => navigate(`/editar/${producto.id}`)}>
        Editar
      </button>

      <button onClick={() => eliminarProducto(producto.id)}>
        Eliminar
      </button>
    </div>
  );
}

export default ProductCard;