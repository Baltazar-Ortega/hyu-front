import React, { useEffect, useRef, useState } from "react";
import { withIronSession } from "next-iron-session";
import { Container, makeStyles, Button, Typography } from "@material-ui/core";
import { useRouter } from "next/router";
import Link from "next/link";
import { useFeedbackEditar } from "../../../../Helpers/customHooks/useFeedbackEditar";
import {
  deleteDescargable,
  getDescargablePorId,
  updateDescargable,
} from "../../../../lib/api";
import { Layout } from "../../../../components/Layout";
import { FeedbackEditarDescargable } from "../../../../components/Helpers/FeedbackEditarDescargable";
import { crearUrlConCloudinary } from "../../../../utils/cloudinary";

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
    display: "none",
  },
  btnEditar: {
    color: "blue",
    borderColor: "blue",
    marginBottom: "20px",
  },
  btnGenerico: {
    marginTop: "30px",
    marginBottom: "40px",
  },
}));

const FormularioEdicionDescargable = ({
  user,
  cloudinaryUsername,
  uploadPreset,
}) => {
  const classes = useStyles();

  const [feedback, feedbackDispatch] = useFeedbackEditar();

  const router = useRouter();

  const [datos, setDatos] = React.useState({
    _id: ``,
    nombre: ``,
    archivo_url: ``,
    fecha_subido: ``,
    fecha_editado: ``
  });

  const [archivo, setArchivo] = useState({
    file: null,
  });
  const archivoUrl = useRef("");

  useEffect(() => {
    obtenerDescargable();
  }, []);

  const obtenerDescargable = async () => {
    const _id_descargable = router.query.id;
    const descargable = await getDescargablePorId(_id_descargable);

    // console.log("descargable Obtenido: ", descargable);
    setDatos({
      _id: descargable._id,
      nombre: descargable.nombre,
      archivo_url: descargable.archivo_url,
      fecha_subido: new Date(parseInt(descargable.fecha_subido)),
      fecha_editado: new Date(parseInt(descargable.fecha_editado))
    });
    setArchivo({ file: null });
    archivoUrl.current = descargable.archivo_url;
  };

  const eliminarDescargable = async () => {
    // console.log("Se borrara descargable con id: ", datos._id);
    feedbackDispatch({ type: "CERRAR_CONFIRMAR_ELIMINACION" });
    feedbackDispatch({ type: "ABRIR_BACKDROP" });
    await deleteDescargable(datos._id);
    feedbackDispatch({ type: "ELEMENTO_ELIMINADO" });
    router.push("/admin/editar_descargable");
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
    if (datos.nombre !== "") {
      return true;
    } else {
      feedbackDispatch({ type: "MOSTRAR_ERROR" });
      return false;
    }
  };

  const crearArchivoUrl = async () => {
    // Se modifico el archivo, se debe crear una nueva url
    if (archivo.file !== null && archivo.file !== undefined) {
      // Es undefined cuando seleccionaste un archivo, y luego le diste cancelar
      // y sigues con el original

      const url = await crearUrlConCloudinary(
        "image",
        archivo.file,
        cloudinaryUsername,
        uploadPreset
      );
      archivoUrl.current = url;
    } else {
      // NO se modifica el archivo. Entonces se sigue usando la misma url
      console.log("No se modifico el archivo");
    }
  };

  const crearObjetoDescargable = async () => {
    await crearArchivoUrl();

    const fechaEditado = new Date()

    const descargable = {
      _id: datos._id,
      nombre: datos.nombre,
      archivo_url: archivoUrl.current,
      fecha_subido: `${datos.fecha_subido.getTime()}`,
      fecha_editado: `${fechaEditado.getTime()}`,
    };

    return descargable;
  };

  const validarFormulario = async (e) => {
    e.preventDefault();
    feedbackDispatch({ type: "ABRIR_BACKDROP" });

    if (validarCampos()) {
      const descargable = await crearObjetoDescargable();
      // console.log("Descargable a mandar a BD: ", descargable);
      editarDescargableEnBD(descargable);
    } else {
      feedbackDispatch({ type: "CERRAR_BACKDROP" });
    }
  };

  const editarDescargableEnBD = async (descargable) => {
    const respuesta = await updateDescargable(descargable);
    // console.log("Descargable editado en la BD", respuesta);

    feedbackDispatch({ type: "CERRAR_BACKDROP" });

    feedbackDispatch({ type: "EDITADO_SATISFACTORIO" });
    // router.push("/admin/editar_descargable");
  };

  const seeState = () => {
    console.log("Datos: ", datos);
    console.log("Archivo: ", archivo);
    console.log("Archivo url actual: ", archivoUrl.current);
  };

  const handleArchivo = (event) => {
    setArchivo({ file: event.target.files[0] });
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
            <span className={classes.spanTitlePost}>
              Editar descargable: {datos.nombre}
            </span>
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
              {archivo.file ? (
                <div>Nombre de archivo: {archivo.file.name}</div>
              ) : (
                <div>
                  Archivo actual: <a target="_blank" style={{color: "blue"}} href={datos.archivo_url}>Link</a>
                  </div>
              )}
            </div>

            <p>* No haga click en "Elegir archivo" si solo quiere cambiar el nombre para mostrar</p>

            <Button
              variant="outlined"
              type="submit"
              className={classes.btnEditar}
            >
              Editar
            </Button>

            <Button
              variant="outlined"
              style={{ color: "red", borderColor: "red", marginBottom: "30px" }}
              className={classes.btnGenerico}
              onClick={() => {
                // console.log("Click en eliminar");
                feedbackDispatch({ type: "ABRIR_CONFIRMAR_ELIMINACION" });
              }}
            >
              Eliminar
            </Button>

            <Link href="/admin/menu">
              <Button
                variant="outlined"
                color="primary"
                className={classes.btnGenerico}
                onClick={() => feedbackDispatch({ type: "ABRIR_BACKDROP" })}
              >
                Volver al menu
              </Button>
            </Link>
          </form>

          <button onClick={seeState}>Ver estado (programador)</button>
        </Container>
      </Layout>

      <FeedbackEditarDescargable
        state={feedback}
        dispatch={feedbackDispatch}
        borrar={eliminarDescargable}
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

export default FormularioEdicionDescargable;
