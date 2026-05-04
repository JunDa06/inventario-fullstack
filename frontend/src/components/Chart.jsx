import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell
} from "recharts";

function Chart({ productos }) {
  const categorias = [
    "Laptop",
    "Teclado",
    "Monitor",
    "Accesorio",
    "Dispositivo móvil"
  ];

  const colores = {
    Laptop: "#3b82f6",
    Teclado: "#22c55e",
    Monitor: "#eab308",
    Accesorio: "#8b5cf6",
    "Dispositivo móvil": "#ef4444"
  };

  const data = categorias.map((cat) => {
    const total = productos.filter(p => p.categoria === cat).length;
    return {
      categoria: cat,
      total
    };
  });

  return (
    <div style={{ marginTop: "30px" }}>
      <h3>📊 Productos por categoría</h3>

      <BarChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="categoria" />
        <YAxis allowDecimals={false} />
        <Tooltip />

        <Bar dataKey="total">
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={colores[entry.categoria]}
            />
          ))}
        </Bar>
      </BarChart>
    </div>
  );
}

export default Chart;