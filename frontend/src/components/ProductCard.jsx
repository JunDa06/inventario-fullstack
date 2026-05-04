import { useNavigate } from "react-router-dom";
import api from "../api/api";

function ProductCard({ producto }) {
  const navigate = useNavigate();

  // 🔥 Clases por categoría
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

  // 🔥 Eliminar producto
  const handleDelete = async () => {
    const confirmar = window.confirm("¿Eliminar producto?");
    if (!confirmar) return;

    try {
      await api.delete(`/productos/${producto._id}`);
      window.location.reload(); // refresca lista
    } catch (error) {
      console.error("Error al eliminar", error);
    }
  };

  return (
    <div className="card">
      <h3>{producto.nombre}</h3>

      {/* 🔥 BADGE */}
      <span className={`badge ${getCategoriaClass(producto.categoria)}`}>
        {producto.categoria}
      </span>

      <p><strong>Precio:</strong> S/. {producto.precio}</p>
      <p><strong>Stock:</strong> {producto.stock}</p>

      <div className="actions">
        <button onClick={() => navigate(`/editar/${producto._id}`)}>
          Editar
        </button>

        <button onClick={handleDelete}>
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default ProductCard;