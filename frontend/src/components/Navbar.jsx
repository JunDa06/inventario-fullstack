import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="sidebar">
      <h2>Dashboard</h2>

      <Link to="/dashboard">📊 Estadísticas</Link>
      <Link to="/">📦 Productos</Link>
      <Link to="/nuevo">➕ Nuevo Producto</Link>
    </div>
  );
}

export default Navbar;