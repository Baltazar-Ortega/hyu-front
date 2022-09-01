import React from "react";
import { makeStyles, Typography, Box, Container } from "@material-ui/core";
import theme from "../../src/theme";

const useStyles = makeStyles({
  backgroundImage: {
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundSize: "cover",
    backgroundImage: `url(${"/images/heroImagen.jpg"})`,
    height: "440px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    [theme.breakpoints.down("md")]: {
      height: "400px",
    },
    [theme.breakpoints.down("sm")]: {
      height: "380px",
    },
    [theme.breakpoints.down("sm")]: {
      height: "320px",
    },
  },
  titulos: {
    color: "white",
    textShadow: "2px 2px black",
  },
  tituloPrincipal: {
    fontSize: "3.2rem",
    fontWeight: "500",
    [theme.breakpoints.down("md")]: {
      fontSize: "2.8rem",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "2rem",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.5rem",
    },
  },
  tituloSecundario: {
    fontSize: "1.7rem",
    fontWeight: "500",
    borderBottom: "2px solid #56C62C",
    display: "inline",
    [theme.breakpoints.down("md")]: {
      fontSize: "1.5rem",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: ".8rem",
    },
  },
});

export const Hero = () => {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.backgroundImage}>
        <Container>
          <Box textAlign="start">
            <Typography
              variant="h2"
              className={`${classes.titulos} ${classes.tituloPrincipal}`}
            >
              Productos para la agricultura y la industria
            </Typography>
            <Typography
              variant="h5"
              className={`${classes.titulos} ${classes.tituloSecundario}`}
            >
              El mejor servicio y calidad para nuestros clientes
            </Typography>
          </Box>
        </Container>
      </div>
    </div>
  );
};
