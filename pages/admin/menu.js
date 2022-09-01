import React, { useState } from "react";
import { withIronSession } from "next-iron-session";
import { useRouter } from "next/router";
import { Layout } from "../../components/Layout";
import { Container, makeStyles, Button, Typography, Snackbar } from "@material-ui/core";
import { CircularCoverBackdrop } from "../../components/Helpers/CircularCoverBackdrop";
import Alert from "@material-ui/lab/Alert";

import Link from "next/link";
import { DEPLOY_HOOK_URL } from "../../lib/helpers";

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
  btnsContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "200px",
    [theme.breakpoints.down("sm")]: {
      height: "auto",
      flexDirection: "column"
    },
  },
  btnsContainerElemento: {
    display: "flex",
    flexDirection: "column",
    margin: "40px",
    [theme.breakpoints.down("sm")]: {
      margin: "20px"
    },
  },
  btn: {
    marginBottom: "40px",
  },
  btnEditar: {
    color: "blue",
    borderColor: "blue",
    marginBottom: "20px",
  },
  btnWarning: {
    borderColor: "orange",
    color: "orange",
    marginBottom: "40px",
  },
  btnDanger: {
    borderColor: "red",
    color: "red",
    marginBottom: "40px",
  },
}));

const menuPrivatePage = ({ user }) => {
  const classes = useStyles();

  const router = useRouter();

  const [openBackdrop, setOpenBackdrop] = React.useState(false);
  const [openPaginaActualizadaExito, setOpenPaginaActualizadaExito] = React.useState(false);
  const [openPaginaActualizadaError, setOpenPaginaActualizadaError] = React.useState(false);
  
  const handleCloseBackdrop = () => {
    setOpenBackdrop(false);
  };
  const handleToggleBackdrop = () => {
    setOpenBackdrop(!openBackdrop);
  };


  const handleClosePaginaActualizadaExito = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenPaginaActualizadaExito(false);
  };

  const handleClosePaginaActualizadaError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenPaginaActualizadaError(false);
  };

  const handleActualizarPagina = async () => {
    handleToggleBackdrop();
    const response = await fetch(DEPLOY_HOOK_URL,
      {
        method: "POST",
      }
    );
    if (response.ok) {
      setOpenPaginaActualizadaExito(true)
    } else {
      setOpenPaginaActualizadaError(true)
    }
    handleCloseBackdrop()
  };

  const handleLogout = async () => {
    handleToggleBackdrop();
    const response = await fetch("/api/logout");
    // console.log("response logout", response);
    if (response.ok) {
      return router.push("/");
    } else {
      window.alert("No se pudo cerrar la sesion");
    }
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
            <span className={classes.spanTitlePost}>Menu</span>
          </Typography>

          <div className={classes.btnsContainer}>
            <div className={classes.btnsContainerElemento}>
              <Link href="/admin/crear_producto">
                <Button
                  variant="outlined"
                  color="primary"
                  className={classes.btn}
                  onClick={() => setOpenBackdrop(true)}
                >
                  Crear producto
                </Button>
              </Link>

              <Link href="/admin/editar_producto">
                <Button
                  variant="outlined"
                  className={`${classes.btn} ${classes.btnEditar}`}
                  onClick={() => setOpenBackdrop(true)}
                >
                  Editar producto
                </Button>
              </Link>
            </div>

            <div className={classes.btnsContainerElemento}>
              <Link href="/admin/crear_oferta">
                <Button
                  variant="outlined"
                  color="primary"
                  className={classes.btn}
                  onClick={() => setOpenBackdrop(true)}
                >
                  Crear oferta
                </Button>
              </Link>

              <Link href="/admin/editar_oferta">
                <Button
                  variant="outlined"
                  className={`${classes.btn} ${classes.btnEditar}`}
                  onClick={() => setOpenBackdrop(true)}
                >
                  Editar oferta
                </Button>
              </Link>
            </div>

            <div className={classes.btnsContainerElemento}>
              <Link href="/admin/agregar_descargable">
                <Button
                  variant="outlined"
                  color="primary"
                  className={classes.btn}
                  onClick={() => setOpenBackdrop(true)}
                >
                  Agregar archivo descargable
                </Button>
              </Link>

              <Link href="/admin/editar_descargable">
                <Button
                  variant="outlined"
                  className={`${classes.btn} ${classes.btnEditar}`}
                  onClick={() => setOpenBackdrop(true)}
                >
                  Editar archivo descargable
                </Button>
              </Link>
            </div>
          </div>

          <div className={classes.btnsContainer}>
            <div className={classes.btnsContainerElemento}>
              <Button
                variant="outlined"
                className={classes.btnWarning}
                onClick={handleActualizarPagina}
              >
                Actualizar pagina
              </Button>

              <Button
                variant="outlined"
                className={classes.btnDanger}
                onClick={handleLogout}
              >
                Cerrar Sesion
              </Button>
            </div>
          </div>
        </Container>
      </Layout>

      <Snackbar open={openPaginaActualizadaExito} autoHideDuration={8000} onClose={handleCloseBackdrop}>
          <Alert onClose={handleClosePaginaActualizadaExito} severity="success">
          Pagina actualizada. Los cambios se veran en aproximadamente de 2 a 5 minutos recargando la pagina.
          </Alert>
      </Snackbar>

      <Snackbar open={openPaginaActualizadaError} autoHideDuration={8000} onClose={handleCloseBackdrop}>
          <Alert onClose={handleClosePaginaActualizadaError} severity="error">
          Error en actualizacion. Intentelo dentro de 10 minutos. 
          </Alert>
      </Snackbar>

      <CircularCoverBackdrop open={openBackdrop} handleClose={handleCloseBackdrop} />
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

    return {
      props: { user },
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

export default menuPrivatePage;
