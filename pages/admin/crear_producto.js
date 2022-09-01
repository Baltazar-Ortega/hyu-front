import {
  Button,
  Container,
  Link,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { withIronSession } from "next-iron-session";
import React, { useEffect, useRef } from "react";
import { FeedbackCrearProducto } from "../../components/Helpers/FeedbackCrearProducto";
import { Layout } from "../../components/Layout";
import { cambiarDatosCondicionales } from "../../Helpers/cambiarDatosCondicionales";
import { useDatosCondicionales } from "../../Helpers/customHooks/useDatosCondicionales";
// Custom Hooks
import { useFeedbackCrear } from "../../Helpers/customHooks/useFeedbackCrear";
import { useImagenFormulario } from "../../Helpers/customHooks/useImagenFormulario";
import {
  createProducto,
  getAllCategoriasGenerales,
  getAllSubcategorias,
  getAllTipos,
  getAllUnidadesDeMedida,
} from "../../lib/api";
import { createSlug, nombreTieneSlugDisponible } from "../../lib/helpers";
import { crearUrlConCloudinary } from "../../utils/cloudinary";

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
  spanTitlePost: {
    borderBottom: "2px solid #56C62C",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "start",
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
  input_numerico: {
    width: "80px",
  },
  precioInputs: {
    display: "flex",
    width: "100%",
  },
  select: {
    height: "30px",
  },
  uploadedImagen: {
    width: "300px",
    marginBottom: "2rem",
  },
  btnCrear: {
    color: "blue",
    borderColor: "blue",
    marginBottom: "20px",
  },
  btnVolver: {
    marginBottom: "40px",
  },
}));

const crearproductoPage = ({
  user,
  categoriasGenerales,
  subcategoriasApi,
  tiposApi,
  unidadesDeMedidaApi,
  cloudinaryUsername,
  uploadPreset,
}) => {
  const classes = useStyles();

  const [feedback, feedbackDispatch] = useFeedbackCrear();

  const [datos, setDatos] = React.useState({
    nombre: ``,
    descripcion: ``,
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

  const [imagen, imagenDispatch] = useImagenFormulario(); // file y pathPreview
  const imagenUrl = useRef(""); // Cloudinary url

  // FUNCIONES
  useEffect(() => {
    setInitialCategorias(true);
  }, []);

  const setInitialCategorias = (primerRender) => {
    const catGenId = categoriasGenerales[0]._id;
    const catGen = categoriasGenerales[0];
    if (catGen.has_subcategorias) {
      const subcategoriasPorCatGen = subcategoriasApi.filter(
        (el) => el._id_categoria_general === catGenId
      );
      datosCondicionalesDispatch({
        type: "SET_SUBCATEGORIAS",
        payload: subcategoriasPorCatGen,
      });

      if (subcategoriasPorCatGen[0].has_tipos) {
        const tiposDeSubcat = tiposApi.find(
          (el) => el._id === subcategoriasPorCatGen[0]._id_tipos
        );
        datosCondicionalesDispatch({
          type: "SET_TIPOS",
          payload: tiposDeSubcat.lista,
        });

        if (primerRender) {
          setDatos({
            ...datos,
            categoriaGeneralId: catGenId,
            subcategoriaId: subcategoriasPorCatGen[0]._id,
            tipo: tiposDeSubcat.lista[0].valor,
          });
        } else {
          imagenDispatch({ type: "ESTADO_INICIAL" });
          imagenUrl.current = "";
          setDatos({
            nombre: "",
            descripcion: "",
            compra_minima: 1,
            unidadMedidaId: unidadesDeMedidaApi[0]._id,
            categoriaGeneralId: catGenId,
            subcategoriaId: subcategoriasPorCatGen[0]._id,
            tipo: tiposDeSubcat.lista[0].valor,
            mostrar_precio: true,
            precio: 0,
          });
          datosCondicionalesDispatch({
            type: "MOSTRAR_PRECIO"
          });
        }
      } else {
        if (primerRender) {
          setDatos({
            ...datos,
            categoriaGeneralId: catGenId,
            subcategoriaId: subcategoriasPorCatGen[0]._id,
          });
        } else {
          imagenDispatch({ type: "ESTADO_INICIAL" });
          imagenUrl.current = "";
          setDatos({
            nombre: "",
            descripcion: "",
            compra_minima: 1,
            unidadMedidaId: unidadesDeMedidaApi[0]._id,
            categoriaGeneralId: catGenId,
            subcategoriaId: subcategoriasPorCatGen[0]._id,
            tipo: "",
            mostrar_precio: true,
            precio: 0,
          });
          datosCondicionalesDispatch({
            type: "MOSTRAR_PRECIO"
          });
        }
      }
    } else {
      if (primerRender) {
        setDatos({
          ...datos,
          categoriaGeneralId: catGenId,
        });
      } else {
        imagenDispatch({ type: "ESTADO_INICIAL" });
        imagenUrl.current = "";
        setDatos({
          nombre: "",
          descripcion: "",
          compra_minima: 1,
          unidadMedidaId: unidadesDeMedidaApi[0]._id,
          categoriaGeneralId: catGenId,
          subcategoriaId: "", // ponerla en null si se queda asi
          tipo: "",
          mostrar_precio: true,
          precio: 0,
        });
        datosCondicionalesDispatch({
          type: "MOSTRAR_PRECIO"
        });
      }

      datosCondicionalesDispatch({ type: "UNSET_SUBCATEGORIAS" });
      datosCondicionalesDispatch({ type: "UNSET_TIPOS" });
    }
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
  };

  const crearImagenUrl = async () => {
    if (imagen.file !== null) {
      const url = await crearUrlConCloudinary(
        "image",
        imagen.file,
        cloudinaryUsername,
        uploadPreset
      );
      imagenUrl.current = url;
    } else {
      const logoHorizontal = "/images/logo_horizontal.jpg";
      imagenUrl.current = logoHorizontal;
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
      // console.log("Producto creado: ", producto);
      crearProductoEnBD(producto);
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

  const crearProductoEnBD = async (producto) => {
    const respuesta = await createProducto(producto);
    // console.log("Producto creado en la BD", respuesta);

    setInitialCategorias(false);

    feedbackDispatch({ type: "CERRAR_BACKDROP" });

    feedbackDispatch({ type: "AGREGADO_SATISFACTORIO" });
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
            variant="h4"
            color="secondary"
            className={classes.titlePost}
          >
            <span className={classes.spanTitlePost}>Crear producto</span>
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
              className={classes.btnCrear}
            >
              Crear
            </Button>
            <Link href="/admin/menu">
              <Button
                variant="outlined"
                color="primary"
                className={classes.btnVolver}
                onClick={() => feedbackDispatch({ type: "ABRIR_BACKDROP" })}
              >
                Volver al menu
              </Button>
            </Link>
          </form>
          <br /> <br />
          <button onClick={seeState}>Ver estado (programador)</button>
          <br /> <br />
        </Container>
      </Layout>

      <FeedbackCrearProducto state={feedback} dispatch={feedbackDispatch} />
    </>
  );
};

export const getServerSideProps = withIronSession(
  async ({ req, res }) => {
    const user = req.session.get("user");

    if (!user) {
      // console.log("No user");
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

export default crearproductoPage;
