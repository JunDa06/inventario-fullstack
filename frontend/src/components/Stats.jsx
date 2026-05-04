function Stats({ productos }) {
  const totalProductos = productos.length;

  const totalStock = productos.reduce((acc, p) => acc + Number(p.stock), 0);

  const valorTotal = productos.reduce(
    (acc, p) => acc + Number(p.precio) * Number(p.stock),
    0
  );

  return (
    <div style={{ display: "flex", gap: "15px", marginBottom: "20px" }}>
      
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
        <p>S/. {valorTotal}</p>
      </div>

    </div>
  );
}

export default Stats;