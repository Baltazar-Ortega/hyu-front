import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Typography, Box } from "@material-ui/core";
import Mapa from "./Mapa";
import { InformacionContacto } from "./InformacionContacto";
import { Formulario } from "./Formulario";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: "45px",
  },
  hero: {
    marginTop: "20px",
    paddingTop: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  titleContacto: {
    color: "white",
    fontWeight: "700",
    borderBottom: (props) =>
      props.littleSubrayado ? "" : `1.5px solid ${theme.palette.primary.main}`,
    "& span": {
      borderBottom: (props) =>
        props.littleSubrayado
          ? `1.5px solid ${theme.palette.primary.main}`
          : "",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.7rem",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.5rem",
    },
  },
  titleSeccion: {
    textAlign: "start",
    color: "white",
    fontSize: "1.8rem",
    textShadow: "3px 3px black",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.4rem",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.2rem",
    },
  },
  subtitleSeccion: {
    color: "white",
    marginTop: "20px",
    textAlign: "start",
    fontWeight: "700",
    textShadow: "3px 3px black",
    [theme.breakpoints.down("sm")]: {
      fontWeight: "400",
      textAlign: "center",
    },
  },
  informacionSeccion: {
    textAlign: "start",
    color: "white",
    fontWeight: "700",
    fontSize: "1rem",
    textShadow: "3px 3px black",
  },
  containerMapa: {
    position: "relative",
    width: "400px",
    height: "300px",
    [theme.breakpoints.down("sm")]: {
      height: "250px",
    },
    [theme.breakpoints.down("xs")]: {
      width: "300px",
      height: "200px",
    },
  },
  containerForm: {
    width: "100%",
    marginTop: "30px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "start",
    [theme.breakpoints.down("sm")]: {
      alignItems: "center",
    },
    [theme.breakpoints.down("xs")]: {
      alignItems: "center",
    },
  },
  containerInputs: {
    marginTop: "20px",
    color: "white",
    width: "100%",
    fontWeight: "700",
    textShadow: "2.5px 2.5px black",
    [theme.breakpoints.down("sm")]: {
      width: "80%",
    },
  },
  divInputs: {
    textAlign: "start",
    marginBottom: "15px",
    "& label": {
      marginRight: "10px",
    },
  },
  inputMensaje: {
    width: "100%",
  },
}));

export const ElementosContacto = () => {
  const classes = useStyles();

  return (
    <>
      <Box className={classes.root} mb={4}>
        <Typography variant="h4" className={classes.titleContacto}>
          <span>Contacto</span>
        </Typography>
        <Grid container spacing={5}>
          <Grid item xs={12} md={6} className={classes.hero}>
            <Box>
              <InformacionContacto />
              <div className={classes.containerMapa}>
                <Mapa />
              </div>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            className={classes.hero}
            style={{ paddingTop: "0px" }}
          >
            <Box className={classes.containerForm}>
              <Typography variant="h4" className={classes.titleSeccion}>
                <span>Envianos un mensaje</span>
              </Typography>
              <Box className={classes.containerInputs}>
                <Formulario />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
