import { useEffect, useState } from "react";
import api from "../api/api";
import Stats from "../components/Stats";
import Chart from "../components/Chart";

function Dashboard() {
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

  if (loading) return <p>Cargando estadísticas...</p>;

  return (
    <div>
      <h2>📊 Dashboard</h2>

      <Stats productos={productos} />

      {/* 🔥 GRÁFICO */}
      <Chart productos={productos} />
    </div>
  );
}

export default Dashboard;