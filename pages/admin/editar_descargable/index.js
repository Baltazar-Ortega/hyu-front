import React, { useState, useEffect, useRef } from "react";
import { withIronSession } from "next-iron-session";
import { Layout } from "../../../components/Layout";
import {
  Container,
  makeStyles,
  Button,
  Link,
  Typography,
} from "@material-ui/core";
import { getAllDescargables } from "../../../lib/api";

import { useFeedbackEditar } from "../../../Helpers/customHooks/useFeedbackEditar";
import { ListaDescargablesEditar } from "../../../components/Descargables/Lista/ListaDescargablesEditar";

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
  btnCrear: {
    color: "blue",
    borderColor: "blue",
    marginBottom: "20px",
  },
  btnEditar: {
    color: "green",
  },
  btnVolver: {
    marginTop: "30px",
    marginBottom: "40px",
  },
  // Editar
  inputTextoBuscar: {
    borderRadius: "5px",
    width: "300px",
    height: "30px",
    textAlign: "center",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const editarDescargablePage = ({ descargablesApi }) => {
  const classes = useStyles();

  return (
    <>
      <Layout>
        <Container style={{ marginTop: "30px", minHeight: "70vh" }}>
          <Typography
            variant="h4"
            color="secondary"
            className={classes.titlePost}
          >
            <span className={classes.spanTitlePost}>Editar descargable</span>
          </Typography>

          <Typography
            variant="h5"
            color="primary"
            className={`${classes.titlePost} ${classes.productosEncontrados}`}
          >
            Descargables subidos
          </Typography>

          <ListaDescargablesEditar
            descargables={descargablesApi}
            editar={true}
          />

          <Link href="/admin/menu">
            <Button
              variant="outlined"
              color="primary"
              className={classes.btnVolver}
            >
              Volver al menu
            </Button>
          </Link>
        </Container>
      </Layout>
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

    const descargables = await getAllDescargables();

    return {
      props: {
        user,
        descargablesApi: descargables,
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

export default editarDescargablePage;
