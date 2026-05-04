function Stats({ productos = [] }) {
  const totalProductos = productos.length;

  const totalStock = productos.reduce(
    (acc, p) => acc + Number(p.stock || 0),
    0
  );

  const valorTotal = productos.reduce(
    (acc, p) => acc + Number(p.precio || 0) * Number(p.stock || 0),
    0
  );

  // 🔥 Formato peruano (16.600)
  const formatoMoneda = valorTotal.toLocaleString("es-PE");

  return (
    <div className="stats-grid">

      <div className="card">
        <h3>📦 Productos</h3>
        <p>{totalProductos}</p>
      </div>

      <div className="card">
        <h3>📊 Stock Total</h3>
        <p>{totalStock}</p>
      </div>

      <div className="card">
        <h3>💰 Valor Inventario</h3>
        <p>S/. {formatoMoneda}</p>
      </div>

    </div>
  );
}

export default Stats;