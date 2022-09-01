import React, { useState, useEffect, useRef } from "react";
import { withIronSession } from "next-iron-session";
import { useRouter } from "next/router";
import { Layout } from "../../components/Layout";
import { Container, makeStyles, Button, Typography } from "@material-ui/core";
import Link from "next/link";

import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import es from "date-fns/locale/es";
registerLocale("es", es);

import { FeedbackEditarOferta } from "../../components/Helpers/FeedbackEditarOferta";
import { useFeedbackEditar } from "../../Helpers/customHooks/useFeedbackEditar";

import { ListaOfertasEditar } from "../../components/Ofertas/Lista/ListaOfertasEditar";
import { BuscadorPorTitulo } from "../../components/Ofertas/Busqueda/BuscadorPorTitulo";

import { getAllOfertas, deleteOferta, updateOferta } from "../../lib/api";
import { useImagenFormulario } from "../../Helpers/customHooks/useImagenFormulario";
import { crearUrlConCloudinary } from "../../utils/cloudinary";

const useStyles = makeStyles((theme) => ({
  titlePost: {
    marginTop: "20px",
    marginBottom: "60px",
    cursor: "pointer",
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
  titulo: {
    fontFamily: "Arial, Helvetica, sans-serif",
    width: "100%",
    fontSize: "15px",
  },
  inputDescripcion: {
    fontFamily: "Arial, Helvetica, sans-serif",
    width: "100%",
    fontSize: "20px",
  },
  input_numerico: {
    width: "80px",
  },
  uploadedImagen: {
    width: "500px",
    marginBottom: "2rem",
  },
  btnEditar: {
    color: "blue",
    borderColor: "blue",
    marginBottom: "20px",
  },
  btnAccion: {
    marginBottom: "40px",
  },
  btnVolver: {
    marginTop: "40px",
    marginBottom: "40px",
  },
}));

const editarofertaPage = ({
  user,
  ofertasApi,
  cloudinaryUsername,
  uploadPreset,
}) => {
  const classes = useStyles();
  const router = useRouter();

  const [feedback, feedbackDispatch] = useFeedbackEditar();
  
  const [textoBuscar, setTextoBuscar] = React.useState("");
  const [ofertasFiltradas, setOfertasFiltradas] = React.useState([]);
  const [verFormulario, setVerFormulario] = React.useState(false);

  const [datos, setDatos] = React.useState({
    ofertaId: "",
    titulo: ``,
    descripcion: ``,
    precio: 0,
  });
  const [fechaVencimiento, setFechaVencimiento] = useState(new Date());

  const [imagen, imagenDispatch] = useImagenFormulario();
  const imagenUrl = useRef(""); // Cloudinary url

  useEffect(() => {
    if (textoBuscar === "") {
      setOfertasFiltradas(ofertasApi);
    } else {
      const ofertasFiltradas = ofertasApi.filter((oferta) => {
        return oferta.titulo.toLowerCase().includes(textoBuscar.toLowerCase());
      });
      setOfertasFiltradas(ofertasFiltradas);
    }
  }, [textoBuscar]);

  const eliminarOferta = async () => {
    feedbackDispatch({ type: "CERRAR_CONFIRMAR_ELIMINACION" });
    feedbackDispatch({ type: "ABRIR_BACKDROP" });
    const respuesta = await deleteOferta(datos.ofertaId);
    feedbackDispatch({ type: "ELEMENTO_ELIMINADO" });
    router.reload();
  };

  // BUSCADOR
  const onCambioTextoBuscar = (e) => {
    setTextoBuscar(e.target.value);
  };

  const setOfertaAEditar = (oferta) => {
    setOfertasFiltradas([oferta]);

    setDatos({
      ofertaId: oferta._id,
      titulo: oferta.titulo,
      descripcion: oferta.descripcion,
      imagenUrl: oferta.imagenUrl,
      precio: oferta.precio,
    });
    // Convertir Epoch a Date
    setFechaVencimiento(new Date(parseInt(oferta.fecha_vencimiento)));
    setVerFormulario(true);

    imagenDispatch({
      type: "MOSTRAR_Y_PERSISTIR_IMAGEN_SUBIDA",
      objectUrl: oferta.imagenUrl,
      file: null,
    });
    imagenUrl.current = oferta.imagenUrl;

    window.scrollTo(0, 520);
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

  const validarCampos = () => {
    if (datos.precio === 0) {
      // console.log("Error. El precio es cero.")
      feedbackDispatch({ type: "MOSTRAR_WARNING" });
      return false;
    }
    if (
      datos.titulo !== "" &&
      datos.ofertaId !== "" &&
      datos.precio !== "" &&
      fechaVencimiento !== null
    ) {
      return true;
    } else {
      feedbackDispatch({ type: "MOSTRAR_ERROR" });
      return false;
    }
  };

  const crearObjetoOferta = async () => {
    await crearImagenUrl();

    const oferta = {
      _id_oferta: datos.ofertaId,
      titulo: datos.titulo,
      descripcion: datos.descripcion,
      imagenUrl: imagenUrl.current,
      fecha_vencimiento: `${fechaVencimiento.getTime()}`,
      precio: datos.precio,
    };

    return oferta;
  };

  const validarFormulario = async (e) => {
    e.preventDefault();
    feedbackDispatch({ type: "ABRIR_BACKDROP" });

    if (validarCampos()) {
      const oferta = await crearObjetoOferta();
      // console.log("Oferta a mandar a BD: ", oferta);
      editarOfertaEnBD(oferta);
    } else {
      feedbackDispatch({ type: "CERRAR_BACKDROP" });
    }
  };

  const editarOfertaEnBD = async (oferta) => {
    const respuesta = await updateOferta(oferta);

    feedbackDispatch({ type: "CERRAR_BACKDROP" });

    if (respuesta._id === "") {
      feedbackDispatch({ type: "MOSTRAR_ERROR_EDITADO" });
      console.log(
        "Ocurrió un error. La oferta no se editó en la base de datos"
      );
    } else {
      setVerFormulario(false);
      feedbackDispatch({ type: "ABRIR_BACKDROP" });
      feedbackDispatch({ type: "EDITADO_SATISFACTORIO" });
      setOfertasFiltradas(ofertasApi);

      // recargar la pagina
      router.reload();
    }
  };

  const seeState = () => {
    console.log("Datos: ", datos);
    console.log("Fecha: ", fechaVencimiento);
    console.log("imagen.current", imagenUrl.current);
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
            <span className={classes.spanTitlePost}>Editar oferta</span>
          </Typography>

          {ofertasApi.length > 0 && (
            <BuscadorPorTitulo
              textoBuscar={textoBuscar}
              onCambioTextoBuscar={onCambioTextoBuscar}
            />
          )}

          <ListaOfertasEditar
            ofertasFiltradas={ofertasFiltradas}
            setOfertaAEditar={setOfertaAEditar}
            editar={true}
          />

          {verFormulario && (
            <form className={classes.form} onSubmit={validarFormulario}>
              <div className={classes.divInputs}>
                <label>
                  <b>Titulo</b>
                </label>
                <input
                  type="text"
                  name="titulo"
                  value={datos.titulo}
                  className={classes.titulo}
                  onChange={handleInputChange}
                />
              </div>

              <div className={classes.divInputs}>
                <label>
                  <b>Descripcion </b>
                  <small>*Opcional</small>
                </label>
                <textarea
                  name="descripcion"
                  value={datos.descripcion}
                  onChange={handleInputChange}
                  className={classes.inputDescripcion}
                  rows="11"
                />
              </div>

              <div className={classes.divInputs}>
                <label>
                  <b>Fecha de vencimiento</b>
                </label>
                <DatePicker
                  dateFormat="dd/MM/yyyy"
                  selected={fechaVencimiento}
                  onChange={(date) => setFechaVencimiento(date)}
                  locale="es"
                />
              </div>

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

              <div className={classes.divInputs}>
                <label>
                  <b>Imagen</b>
                  <p>*Si no elige una imagen, se colocará el logo de HyU</p>
                </label>
                <input type="file" name="imagen" onChange={mostrarImagen} />
              </div>

              <div>
                <img
                  id="uploadedImage"
                  src={imagen.pathPreview}
                  className={classes.uploadedImagen}
                />
              </div>

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
                className={classes.btnAccion}
                onClick={() =>
                  feedbackDispatch({ type: "ABRIR_CONFIRMAR_ELIMINACION" })
                }
              >
                Eliminar
              </Button>

              <Button
                variant="outlined"
                color="secondary"
                className={classes.btnAccion}
                onClick={() => {
                  feedbackDispatch({ type: "ABRIR_BACKDROP" });
                  router.reload();
                }}
              >
                Volver al buscador
              </Button>
            </form>
          )}
          {/* Terminar formulario */}

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

          <br />
          <br />
          <button onClick={seeState}>Ver estado (programador)</button>
        </Container>
      </Layout>

      <FeedbackEditarOferta
        state={feedback}
        dispatch={feedbackDispatch}
        borrar={eliminarOferta}
      />
    </>
  );
};

export const getServerSideProps = withIronSession(
  async ({ req, res }) => {
    const user = req.session.get("user");

    // console.log("session", req.session)
    // console.log("Usuario actual", user)
    if (!user) {
      // console.log("No user")
      res.setHeader("location", "/admin");
      res.statusCode = 302;
      res.end();
      return { props: {} };
    }

    const allOfertasApi = await getAllOfertas();
    const cloudinaryUsername = process.env.CLOUDINARY_USERNAME;
    const uploadPreset = process.env.UPLOAD_PRESET;

    return {
      props: {
        user,
        cloudinaryUsername,
        uploadPreset,
        ofertasApi: allOfertasApi,
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

export default editarofertaPage;
