import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";
import { Container, Grid, Button, Hidden } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "#449E23",
  },
  toolbar: {
    minHeight: "35px",
  },
  grid: {
    margin: "0px",
  },
  gridItem: {
    padding: "0px",
    textAlign: "center",
  },
  opciones: {
    color: "white",
    fontWeight: "400",
    cursor: "pointer",
    textAlign: "center",
    textTransform: "capitalize",
  },
  opcionesContacto: {
    fontWeight: "700",
  },
  botonOpciones: {
    borderRadius: "0px",
    paddingLeft: "20px",
    paddingRight: "20px",
    "&:hover": {
      background: theme.palette.secondary.main,
    },
  },
  botonOpcionesContacto: {
    background: theme.palette.secondary.main,
    paddingLeft: "25px",
    paddingRight: "25px",
    fontWeight: "700",
  },
}));

const LinkOpcion = ({ uri, opcion, contacto }) => {
  const classes = useStyles();

  return (
    <Grid item xs style={{ padding: "0px", textAlign: "center" }}>
      <Link href={uri} passHref>
        <a>
          <Button
            className={
              contacto
                ? `${classes.botonOpciones} ${classes.botonOpcionesContacto}`
                : classes.botonOpciones
            }
          >
            <Typography
              variant="subtitle1"
              className={
                contacto
                  ? `${classes.opciones} ${classes.opcionesContacto}`
                  : classes.opciones
              }
            >
              {opcion}
            </Typography>
          </Button>
        </a>
      </Link>
    </Grid>
  );
};

export const HeaderMenu = () => {
  const classes = useStyles();
  return (
    <div>
      <Hidden smDown>
        <AppBar position="static" className={classes.appBar}>
          <Container>
            <Toolbar className={classes.toolbar}>
              <Grid container spacing={8} className={classes.grid}>
                <LinkOpcion uri="/productos" opcion="Productos" />

                <LinkOpcion uri="/ofertas" opcion="Ofertas" />
                <LinkOpcion uri="/acerca-de" opcion="Acerca de HyU" />
                <LinkOpcion uri="/blog" opcion="Blog" />

                <LinkOpcion uri="/contacto" opcion="Contacto" contacto />
              </Grid>
            </Toolbar>
          </Container>
        </AppBar>
      </Hidden>
    </div>
  );
};
