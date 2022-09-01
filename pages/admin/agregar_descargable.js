import React, { useRef, useState } from "react";
import { withIronSession } from "next-iron-session";
import { Layout } from "../../components/Layout";
import { Container, makeStyles, Button, Typography } from "@material-ui/core";
import { useFeedbackCrear } from "../../Helpers/customHooks/useFeedbackCrear";

import Link from "next/link";
import { createDescargable } from "../../lib/api";
import { crearUrlConCloudinary } from "../../utils/cloudinary";
import { FeedbackCrearDescargable } from "../../components/Helpers/FeedbackCrearDescargable";

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
  inputNombre: {
    fontFamily: "Arial, Helvetica, sans-serif",
    width: "60%",
    fontSize: "15px",
  },
  labelArchivo: {
    marginBottom: "20px",
  },
  botonArchivo: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "2px green solid",

    width: "150px",
    height: "30px",
    cursor: "pointer",
  },
  inputArchivo: {
    // width: "25%",
    display: "none",
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

const crearDescargablePage = ({ user, cloudinaryUsername, uploadPreset }) => {
  const classes = useStyles();

  const [feedback, feedbackDispatch] = useFeedbackCrear();

  const [datos, setDatos] = React.useState({
    nombre: ``,
  });

  const [archivo, setArchivo] = useState({
    file: null,
  });
  const archivoUrl = useRef("");

  const setEstadoInicial = () => {
    setDatos({ nombre: `` });
    setArchivo({ file: null });
    archivoUrl.current = "";
  };

  const handleInputChange = async (event) => {
    const target = event.target;
    const name = target.name;
    let value;
    if (!target.value) {
      value = "";
    } else {
      value = target.value;
    }

    setDatos({
      ...datos,
      [name]: value,
    });
  };

  const validarCampos = () => {
    if (datos.nombre !== "" && archivo.file !== null && archivo.file !== undefined) {
      return true;
    } else {
      feedbackDispatch({ type: "MOSTRAR_ERROR" });
      return false;
    }
  };

  const crearArchivoUrl = async () => {
    const url = await crearUrlConCloudinary(
      "image",
      archivo.file,
      cloudinaryUsername,
      uploadPreset
    );
    archivoUrl.current = url;
  };

  const crearObjetoDescargable = async () => {
    // Se estan manejando las fechas como strings, tambien en graphql backend
    // En el modelo del backend esta como Date, pero no hay problemas
    // getTime - devuelve el valor numerico

    await crearArchivoUrl();
    const fechaActual = new Date()

    const descargable = {
      nombre: datos.nombre,
      archivo_url: archivoUrl.current,
      fecha_subido: `${fechaActual.getTime()}`,
      fecha_editado:  `${fechaActual.getTime()}`,
    };

    return descargable;
  };

  const validarFormulario = async (e) => {
    e.preventDefault();
    feedbackDispatch({ type: "ABRIR_BACKDROP" });

    if (validarCampos()) {
      const descargable = await crearObjetoDescargable();
      // console.log("Descargable a mandar a BD: ", descargable);
      crearDescargableEnBD(descargable);
    } else {
      feedbackDispatch({ type: "CERRAR_BACKDROP" });
    }
  };

  const crearDescargableEnBD = async (descargable) => {
    const respuesta = await createDescargable(descargable);
    // console.log("Descargable creado en la BD", respuesta);

    feedbackDispatch({ type: "CERRAR_BACKDROP" });

    feedbackDispatch({ type: "AGREGADO_SATISFACTORIO" });
    setEstadoInicial();
  };

  const seeState = () => {
    console.log("Datos: ", datos);
    console.log("Archivo: ", archivo);
  };

  const handleArchivo = (event) => {
    setArchivo({file: event.target.files[0]})
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
            <span className={classes.spanTitlePost}>Crear descargable</span>
          </Typography>

          <form className={classes.form} onSubmit={validarFormulario}>
            <div className={classes.divInputs}>
              <label>
                <b>Nombre para mostrar</b>
              </label>
              <input
                type="text"
                name="nombre"
                value={datos.nombre}
                className={classes.inputNombre}
                onChange={handleInputChange}
              />
            </div>

            <div className={classes.divInputs}>
              <label
                htmlFor="archivo"
                className={classes.labelArchivo}
                style={{ display: "inline-block" }}
              >
                <div className={classes.botonArchivo}>Elegir archivo</div>
              </label>
              <input
                type="file"
                name="archivo_url"
                onChange={handleArchivo}
                className={classes.inputArchivo}
                id="archivo"
              />
              {archivo.file && <div>Nombre de archivo: {archivo.file.name}</div>}
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

      <FeedbackCrearDescargable state={feedback} dispatch={feedbackDispatch} />
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

export default crearDescargablePage;
