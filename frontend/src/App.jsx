import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProductList from "./pages/ProductList";
import ProductForm from "./pages/ProductForm";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar />

        <div className="main-content">
          <h1 className="header">Inventario Tecnológico</h1>

          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/" element={<ProductList />} />

            <Route path="/nuevo" element={<ProductForm />} />

            <Route path="/editar/:id" element={<ProductForm />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;