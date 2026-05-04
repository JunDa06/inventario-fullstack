import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import api from "../api/api";

function ProductForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [productoEditar, setProductoEditar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(""); // 🔥 NUEVO

  // 🔥 Obtener producto si estamos editando
  useEffect(() => {
    const obtenerProducto = async () => {
      if (id) {
        try {
          const res = await api.get("/productos");
          const producto = res.data.find((p) => p._id === id);
          setProductoEditar(producto);
        } catch (error) {
          console.error("Error al cargar producto", error);
        }
      }
      setLoading(false);
    };

    obtenerProducto();
  }, [id]);

  const initialValues = productoEditar || {
    nombre: "",
    categoria: "",
    precio: "",
    stock: ""
  };

  const validationSchema = Yup.object({
    nombre: Yup.string().required("El nombre es obligatorio"),

    categoria: Yup.string().required("La categoría es obligatoria"),

    precio: Yup.number()
      .typeError("Debe ser un número")
      .positive("Debe ser mayor a 0")
      .required("El precio es obligatorio"),

    stock: Yup.number()
      .typeError("Debe ser un número")
      .min(0, "No puede ser negativo")
      .required("El stock es obligatorio")
  });

  const onSubmit = async (values) => {
    try {
      setError(""); // limpiar error

      if (productoEditar) {
        await api.put(`/productos/${productoEditar._id}`, values);
      } else {
        await api.post("/productos", values);
      }

      navigate("/");
    } catch (error) {
      // 🔥 MOSTRAR ERROR DEL BACKEND
      const mensaje =
        error.response?.data?.error || "Error al conectar con el servidor";

      setError(mensaje);
    }
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="form-container">
      <h2>{productoEditar ? "Editar Producto" : "Nuevo Producto"}</h2>

      {/* 🔥 MENSAJE DE ERROR */}
      {error && <p className="error">{error}</p>}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize={true}
        onSubmit={onSubmit}
      >
        <Form>

          {/* NOMBRE */}
          <div>
            <label>Nombre</label>
            <Field name="nombre" />
            <ErrorMessage name="nombre" component="p" className="error" />
          </div>

          {/* CATEGORÍA */}
          <div>
            <label>Categoría</label>
            <Field as="select" name="categoria">
              <option value="">Seleccione</option>
              <option value="Laptop">Laptop</option>
              <option value="Teclado">Teclado</option>
              <option value="Monitor">Monitor</option>
              <option value="Accesorio">Accesorio</option>
              <option value="Dispositivo móvil">Dispositivo móvil</option>
            </Field>
            <ErrorMessage name="categoria" component="p" className="error" />
          </div>

          {/* PRECIO */}
          <div>
            <label>Precio</label>
            <Field name="precio" type="number" />
            <ErrorMessage name="precio" component="p" className="error" />
          </div>

          {/* STOCK */}
          <div>
            <label>Stock</label>
            <Field name="stock" type="number" />
            <ErrorMessage name="stock" component="p" className="error" />
          </div>

          <button type="submit">
            {productoEditar ? "Actualizar" : "Guardar"}
          </button>

        </Form>
      </Formik>
    </div>
  );
}

export default ProductForm;