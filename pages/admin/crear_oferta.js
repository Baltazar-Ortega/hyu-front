import React, { useEffect, useRef, useState } from "react";
import { withIronSession } from "next-iron-session";
import { useRouter } from "next/router";
import { Layout } from "../../components/Layout";
import { Container, makeStyles, Button, Typography } from "@material-ui/core";
import { useFeedbackCrear } from "../../Helpers/customHooks/useFeedbackCrear";
import { FeedbackCrearOferta } from "../../components/Helpers/FeedbackCrearOferta";
import Link from "next/link";
import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import { createOferta } from "../../lib/api";
import { crearUrlConCloudinary } from "../../utils/cloudinary";
import { useImagenFormulario } from "../../Helpers/customHooks/useImagenFormulario";
registerLocale("es", es);

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
  btnCrear: {
    color: "blue",
    borderColor: "blue",
    marginBottom: "20px",
  },
  btnVolver: {
    marginBottom: "40px",
  },
}));

const crearofertaPage = ({ user, cloudinaryUsername, uploadPreset }) => {
  const classes = useStyles();

  const [feedback, feedbackDispatch] = useFeedbackCrear();

  const [datos, setDatos] = React.useState({
    titulo: ``,
    descripcion: ``,
    precio: 0,
  });
  const [fechaVencimiento, setFechaVencimiento] = useState(new Date());

  const [imagen, imagenDispatch] = useImagenFormulario(); // file y pathPreview
  const imagenUrl = useRef(""); // Cloudinary url

  useEffect(() => {
    setInitialCategorias(false)
  }, []);
  
  const setInitialCategorias = (crearOtraOferta) => {
    imagenDispatch({ type: "ESTADO_INICIAL" });
    imagenUrl.current = "";
    if (crearOtraOferta) {
      setFechaVencimiento(new Date())
      setDatos({
        titulo: ``,
        descripcion: ``,
        precio: 0,
      })
    }
  }

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

  const validarCampos = () => {
    if (datos.titulo !== "" && fechaVencimiento !== null) {
      return true;
    } else if (datos.precio === 0) {
      feedbackDispatch({ type: "MOSTRAR_WARNING" });
      return false;
    } else {
      feedbackDispatch({ type: "MOSTRAR_ERROR" });
      return false;
    }
  };

  const crearObjetoOferta = async () => {
    await crearImagenUrl();

    const oferta = {
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
      console.log("Oferta a mandar a BD: ", oferta)
      crearOfertaEnBD(oferta);
    } else {
      feedbackDispatch({ type: "CERRAR_BACKDROP" });
    }
  };

  const crearOfertaEnBD = async (oferta) => {
    const respuesta = await createOferta(oferta);
    // console.log("Oferta creada en la BD", respuesta)

    feedbackDispatch({ type: "CERRAR_BACKDROP" });
    feedbackDispatch({ type: "AGREGADO_SATISFACTORIO" });

    setInitialCategorias(true)
  };

  const seeState = () => {
    console.log("Datos: ", datos);
    console.log("Fecha: ", fechaVencimiento);
    console.log("imagen.current", imagenUrl.current)
    console.log("imagen", imagen)
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
            <span className={classes.spanTitlePost}>Crear oferta</span>
          </Typography>

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

          <button onClick={seeState}>Ver estado (programador)</button>
        </Container>
      </Layout>

      <FeedbackCrearOferta state={feedback} dispatch={feedbackDispatch} />
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

    const cloudinaryUsername = process.env.CLOUDINARY_USERNAME;
    const uploadPreset = process.env.UPLOAD_PRESET;

    return {
      props: { user, cloudinaryUsername, uploadPreset },
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

export default crearofertaPage;
