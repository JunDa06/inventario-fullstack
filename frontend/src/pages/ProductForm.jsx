import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function ProductForm({
  agregarProducto,
  productos,
  actualizarProducto
}) {
  const navigate = useNavigate();
  const { id } = useParams();

  const productoEditar = productos?.find(
    (p) => p.id === Number(id)
  );

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

  const onSubmit = (values) => {
    if (productoEditar) {
      actualizarProducto({ ...values, id: productoEditar.id });
    } else {
      agregarProducto(values);
    }

    navigate("/");
  };

  return (
    <div className="form-container">
      <h2>
        {productoEditar ? "Editar Producto" : "Registrar Producto"}
      </h2>

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

          {/* 🔥 CATEGORÍA */}
          <div>
            <label>Categoría</label>
            <Field as="select" name="categoria">
              <option value="">Seleccione una categoría</option>
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