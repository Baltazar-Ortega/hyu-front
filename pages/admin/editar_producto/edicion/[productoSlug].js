import { Button, Container, makeStyles, Typography } from "@material-ui/core";
import { withIronSession } from "next-iron-session";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { Layout } from "../../../../components/Layout";
import { useDatosCondicionales } from "../../../../Helpers/customHooks/useDatosCondicionales";
import { useFeedbackEditar } from "../../../../Helpers/customHooks/useFeedbackEditar";
import { useImagenFormulario } from "../../../../Helpers/customHooks/useImagenFormulario";
import {
  deleteProducto,
  getAllCategoriasGenerales,
  getAllSubcategorias,
  getAllTipos,
  getAllUnidadesDeMedida,
  getProductoPorSlug,
  updateProducto,
} from "../../../../lib/api";
import { createSlug, nombreTieneSlugDisponible } from "../../../../lib/helpers";
import Link from "next/link";
import { FeedbackEditarProducto } from "../../../../components/Helpers/FeedbackEditarProducto";
import { cambiarDatosCondicionales } from "../../../../Helpers/cambiarDatosCondicionales";
import { crearUrlConCloudinary } from "../../../../utils/cloudinary";

const useStyles = makeStyles((theme) => ({
  titlePost: {
    marginTop: "20px",
    marginBottom: "60px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "2rem",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.5rem",
    },
  },
  productosEncontrados: {
    marginTop: "40px",
    marginBottom: "20px",
  },
  spanTitlePost: {
    borderBottom: "2px solid #56C62C",
  },
  listItemContainer: {
    "&:hover": {
      boxShadow: "10px 5px 5px gray",
    },
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "start",
    marginTop: "50px",
  },
  divInputs: {
    textAlign: "start",
    marginBottom: "25px",
    display: "inline",
    width: "100%",
    "& label": {
      marginRight: "10px",
      display: "block",
    },
  },
  nombre: {
    width: "300px",
  },
  inputDescripcion: {
    width: "100%",
  },
  precioInputs: {
    display: "flex",
    width: "100%",
  },
  input_numerico: {
    width: "80px",
  },
  select: {
    height: "30px",
  },
  uploadedImagen: {
    width: "280px",
    marginBottom: "2rem",
  },
  btnEditar: {
    color: "blue",
    borderColor: "blue",
    marginTop: "30px",
    marginBottom: "20px",
  },
  btnGenerico: {
    marginTop: "30px",
    marginBottom: "40px",
  },
}));

const FormularioEdicionProducto = ({
  categoriasGenerales,
  subcategoriasApi,
  tiposApi,
  unidadesDeMedidaApi,
  cloudinaryUsername,
  uploadPreset,
}) => {
  const classes = useStyles();

  const router = useRouter();

  const [feedback, feedbackDispatch] = useFeedbackEditar();

  const [datos, setDatos] = React.useState({
    productoId: "",
    nombre: "",
    descripcion: "",
    compra_minima: 1,
    unidadMedidaId: unidadesDeMedidaApi[0]._id,
    categoriaGeneralId: "",
    subcategoriaId: "", // ponerla en null si se queda asi
    tipo: "", // ponerla en null si se queda asi
    mostrar_precio: true,
    precio: 0,
  });

  const [
    datosCondicionales,
    datosCondicionalesDispatch,
  ] = useDatosCondicionales();

  const [imagen, imagenDispatch] = useImagenFormulario();
  const imagenUrl = useRef(""); // Cloudinary url

  useEffect(() => {
    obtenerProducto();
  }, []);

  const eliminarProducto = async () => {
    // console.log("Se borrara producto con id: ", datos.productoId);
    feedbackDispatch({ type: "CERRAR_CONFIRMAR_ELIMINACION" });
    feedbackDispatch({ type: "ABRIR_BACKDROP" });
    await deleteProducto(datos.productoId);
    feedbackDispatch({ type: "ELEMENTO_ELIMINADO" });
    router.push("/admin/editar_producto");
  };

  const obtenerProducto = async () => {
    const slug = router.query.productoSlug;
    const producto = await getProductoPorSlug(slug);
    // console.log("producto: ", producto);

    setDatos({
      productoId: producto._id,
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      compra_minima: producto.compra_minima,
      unidadMedidaId: producto.unidadMedida._id,
      categoriaGeneralId: producto._id_categoria_general,
      subcategoriaId:
        producto.subcategoria === null ? "" : producto.subcategoria._id,
      tipo: producto.tipo,
      mostrar_precio: producto.mostrar_precio,
      precio: producto.precio,
    });

    imagenDispatch({
      type: "MOSTRAR_Y_PERSISTIR_IMAGEN_SUBIDA",
      objectUrl: producto.imagenUrl,
      file: null,
    });

    imagenUrl.current = producto.imagenUrl;

    datosCondicionalesDispatch({
      type: "CONDICION_MOSTRAR_PRECIO",
      payload: producto.mostrar_precio,
    });
  };

  const handleInputChange = async (event) => {
    const target = event.target;
    const name = target.name;
    let value;
    if (!target.value) {
      value = "";
    } else {
      value =
        target.type === "number" ? parseFloat(target.value) : target.value;
    }

    setDatos({
      ...datos,
      [name]: value,
    });

    const parametrosCambiarDatosCondicionales = {
      datosCondicionalesDispatch,
      datos,
      setDatos,
      value,
      categoriasGenerales,
      subcategoriasApi,
      tiposApi,
    };

    if (name === "mostrar_precio") {
      cambiarDatosCondicionales({
        type: "mostrar_precio",
        ...parametrosCambiarDatosCondicionales,
      });
    }

    if (name === "categoriaGeneralId") {
      cambiarDatosCondicionales({
        type: "categoriaGeneralId",
        ...parametrosCambiarDatosCondicionales,
      });
    }

    if (name === "subcategoriaId") {
      // Se cambió la subcategoria en el select
      cambiarDatosCondicionales({
        type: "subcategoriaId",
        ...parametrosCambiarDatosCondicionales,
      });
    }
  };

  const mostrarImagen = (event) => {
    imagenDispatch({
      type: "MOSTRAR_Y_PERSISTIR_IMAGEN_SUBIDA",
      objectUrl: URL.createObjectURL(event.target.files[0]),
      file: event.target.files[0],
    });
    imagenUrl.current = "";
  };

  const crearImagenUrl = async () => {
    if (imagenUrl.current === "") {
      const url = await crearUrlConCloudinary(
        "image",
        imagen.file,
        cloudinaryUsername,
        uploadPreset
      );
      imagenUrl.current = url;
    } else {
      console.log("No se cambió la imagen");
    }
  };

  const validarCampos = async (slugDisponible) => {
    if (
      datos.nombre !== "" &&
      datos.descripcion !== "" &&
      datos.compra_minima >= 0 &&
      datos.unidadMedidaId !== "" &&
      datos.categoriaGeneralId !== "" &&
      datos.precio !== "" &&
      slugDisponible
    ) {
      return true;
    } else {
      return false;
    }
  };

  const crearObjetoProducto = async () => {
    await crearImagenUrl();

    const slug = createSlug(datos.nombre);

    const has_subcategoria = datos.subcategoriaId === "" ? false : true;

    if (datos.mostrar_precio && datos.precio === 0) {
      console.log("El precio no puede ser cero");
      return;
    }

    const producto = {
      _id_producto: datos.productoId,
      _id_categoria_general: datos.categoriaGeneralId,
      nombre: datos.nombre,
      slug: slug,
      imagenUrl: imagenUrl.current,
      descripcion: datos.descripcion,
      compra_minima: datos.compra_minima,
      _id_unidad_de_medida: datos.unidadMedidaId,
      has_subcategoria: has_subcategoria,
      _id_subcategoria: has_subcategoria ? datos.subcategoriaId : null,
      tipo: datos.tipo === "" ? null : datos.tipo,
      mostrar_precio: datos.mostrar_precio,
      precio: datos.precio,
    };


    return producto;
  };

  const validarFormulario = async (e) => {
    e.preventDefault();
    feedbackDispatch({ type: "ABRIR_BACKDROP" });
    const slugDisponible = await nombreTieneSlugDisponible(
      datos.nombre,
      datos.productoId
    );

    if (await validarCampos(slugDisponible)) {
      const producto = await crearObjetoProducto();

      editarProductoEnBD(producto);
    } else {
      if (!slugDisponible) {
        feedbackDispatch({ type: "CERRAR_BACKDROP" });
        feedbackDispatch({ type: "MOSTRAR_WARNING" });
      } else {
        feedbackDispatch({ type: "CERRAR_BACKDROP" });
        feedbackDispatch({ type: "MOSTRAR_ERROR" });
      }
    }
  };

  const editarProductoEnBD = async (producto) => {
    const respuesta = await updateProducto(producto);
    // console.log("Producto editado en la BD", respuesta);

    feedbackDispatch({ type: "CERRAR_BACKDROP" });

    if (respuesta._id === "") {
      feedbackDispatch({ type: "MOSTRAR_ERROR_EDITADO" });
      console.log(
        "Ocurrió un error. El producto no se editó en la base de datos"
      );
    } else {
      imagenUrl.current = "";
      feedbackDispatch({ type: "ABRIR_BACKDROP" });
      feedbackDispatch({ type: "EDITADO_SATISFACTORIO" });
      router.push("/admin/editar_producto");
    }
  };
  const seeState = () => {
    console.log("estado actual datos", datos);
    console.log("imagen", imagen);
  };

  return (
    <>
      <Layout>
        <Container style={{ marginTop: "30px", minHeight: "70vh" }}>
          <Typography
            variant="h5"
            color="secondary"
            className={classes.titlePost}
          >
            <span className={classes.spanTitlePost}>
              Editando: {datos.nombre}
            </span>
          </Typography>

          <form className={classes.form} onSubmit={validarFormulario}>
            <div className={classes.divInputs}>
              <label>
                <b>Nombre</b>
              </label>
              <input
                type="text"
                name="nombre"
                value={datos.nombre}
                className={classes.nombre}
                onChange={handleInputChange}
              />
            </div>

            <div className={classes.divInputs}>
              <label>
                <b>Descripcion</b>
              </label>
              <textarea
                name="descripcion"
                value={datos.descripcion}
                onChange={handleInputChange}
                className={classes.inputDescripcion}
                rows="11"
              />
            </div>

            <div className={classes.precioInputs}>
              <div className={classes.divInputs}>
                <label>
                  <b>Mostrar precio</b>
                </label>
                <select
                  name="mostrar_precio"
                  value={datos.mostrar_precio}
                  onChange={handleInputChange}
                  className={classes.select}
                >
                  <option value={true}>Si</option>
                  <option value={false}>No</option>
                </select>
              </div>

              {datosCondicionales.showPrecio && (
                <div className={classes.divInputs}>
                  <label>
                    <b>Precio</b>
                  </label>
                  <input
                    type="number"
                    name="precio"
                    value={datos.precio}
                    className={classes.input_numerico}
                    onChange={handleInputChange}
                  />
                </div>
              )}
            </div>

            <div className={classes.divInputs}>
              <label>
                <b>Compra minima</b>
              </label>
              <input
                type="number"
                name="compra_minima"
                value={datos.compra_minima}
                className={classes.input_numerico}
                onChange={handleInputChange}
              />
            </div>

            <div className={classes.divInputs}>
              <label>
                <b>Unidad de medida</b>
              </label>
              <select
                name="unidadMedidaId"
                value={datos.unidadMedidaId}
                onChange={handleInputChange}
                className={classes.select}
              >
                {unidadesDeMedidaApi &&
                  unidadesDeMedidaApi.map((el, index) => (
                    <option key={index} value={el._id}>
                      {el.nombre}
                    </option>
                  ))}
              </select>
            </div>

            <div className={classes.divInputs}>
              <label>
                <b>Imagen</b>
                <p>*Si no elige una imagen, se colocará el logo de HyU</p>
              </label>
              <input type="file" name="imagen" onChange={mostrarImagen} />
            </div>

            <div className={classes.imgContainer}>
              <img
                id="uploadedImage"
                src={imagen.pathPreview}
                className={classes.uploadedImagen}
              />
            </div>

            <div className={classes.divInputs}>
              <label>
                <b>Categoria general</b>
              </label>
              <select
                name="categoriaGeneralId"
                value={datos.categoriaGeneralId}
                onChange={handleInputChange}
                className={classes.select}
              >
                {categoriasGenerales &&
                  categoriasGenerales.map((el, index) => (
                    <option key={index} value={el._id}>
                      {el.label}
                    </option>
                  ))}
              </select>
            </div>

            {datosCondicionales.showSubcategorias && (
              <div className={classes.divInputs}>
                <label>
                  <b>Subcategoria</b>
                </label>
                <select
                  name="subcategoriaId"
                  value={datos.subcategoriaId}
                  onChange={handleInputChange}
                  className={classes.select}
                >
                  {datosCondicionales.subcategorias &&
                    datosCondicionales.subcategorias.map((el, index) => (
                      <option key={index} value={el._id}>
                        {el.label}
                      </option>
                    ))}
                </select>
              </div>
            )}

            {datosCondicionales.showTipos && (
              <div className={classes.divInputs}>
                <label>
                  <b>Tipo</b>
                </label>
                <select
                  name="tipo"
                  value={datos.tipo}
                  onChange={handleInputChange}
                  className={classes.select}
                >
                  {datosCondicionales.tipos &&
                    datosCondicionales.tipos.map((el, index) => (
                      <option key={index} value={el.valor}>
                        {el.label}
                      </option>
                    ))}
                </select>
              </div>
            )}

            <Button
              variant="outlined"
              type="submit"
              className={classes.btnEditar}
            >
              Editar
            </Button>

            <Button
              variant="outlined"
              style={{ color: "red", borderColor: "red" }}
              className={classes.btnGenerico}
              onClick={() => {
                // console.log("Click en eliminar");
                feedbackDispatch({ type: "ABRIR_CONFIRMAR_ELIMINACION" });
              }}
            >
              Eliminar
            </Button>

            <Link href={"/admin/editar_producto"}>
              <a>
                <Button
                  variant="outlined"
                  color="primary"
                  className={classes.btnGenerico}
                  onClick={() => feedbackDispatch({ type: "ABRIR_BACKDROP" })}
                >
                  Volver al buscador
                </Button>
              </a>
            </Link>
          </form>
          <div>
            <br /> <br />
            <button onClick={seeState}>Ver estado (programador)</button>
          </div>
        </Container>
      </Layout>

      <FeedbackEditarProducto
        state={feedback}
        dispatch={feedbackDispatch}
        borrar={eliminarProducto}
      />
    </>
  );
};

export const getServerSideProps = withIronSession(
  async ({ req, res }) => {
    const user = req.session.get("user");

    if (!user) {
      res.setHeader("location", "/admin");
      res.statusCode = 302;
      res.end();
      return { props: {} };
    }

    const allCategoriasGenerales = await getAllCategoriasGenerales();
    const allSubcategorias = await getAllSubcategorias();
    const allTipos = await getAllTipos();
    const allUnidadesDeMedida = await getAllUnidadesDeMedida();

    const cloudinaryUsername = process.env.CLOUDINARY_USERNAME;
    const uploadPreset = process.env.UPLOAD_PRESET;

    return {
      props: {
        user,
        categoriasGenerales: allCategoriasGenerales,
        subcategoriasApi: allSubcategorias,
        tiposApi: allTipos,
        unidadesDeMedidaApi: allUnidadesDeMedida,
        cloudinaryUsername,
        uploadPreset,
      },
    };
  },
  {
    cookieName: "MYSITECOOKIE",
    cookieOptions: {
      secure: false,
    },
    password: process.env.APPLICATION_SECRET,
  }
);

export default FormularioEdicionProducto;
