import React from "react";
import {
  Container,
  makeStyles,
  Box,
  Grid,
  Typography,
} from "@material-ui/core";
import { Telefonos } from "../Contacto/Telefonos";
import { Correo } from "../Contacto/Correo";

const useStyles = makeStyles((theme) => ({
  containerFooter: {
    backgroundColor: theme.palette.secondary.dark,
    marginTop: "0px",
  },
  containerSeccionesFooter: {
    textAlign: "center",
  },
  tituloSeccion: {
    color: "white",
    fontWeight: "700",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.2rem",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.9rem",
    },
  },
  informacionSeccion: {
    color: "white",
    marginTop: "10px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.7rem",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.7rem",
    },
  },
  iconoYDatos: {
    display: "flex",
    "& span": {
      marginLeft: "10px",
    },
  },
}));

export const Footer = () => {
  const classes = useStyles();
  return (
    <Box className={classes.containerFooter} mt={5}>
      <Container>
        <Grid
          container
          spacing={3}
          className={classes.containerSeccionesFooter}
        >
          <Grid item xs={12} sm={6} style={{ paddingBottom: "0px" }}>
            <Box>
              <Typography variant="h5" className={classes.tituloSeccion}>
                Ubicación
              </Typography>
              <p className={classes.informacionSeccion}>
                Av. Don Juan Saade Murra #635 <br />
                Saltillo, Coah., México. C.P. 25204
              </p>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box>
              <Typography variant="h5" className={classes.tituloSeccion}>
                Ventas
              </Typography>
              <Telefonos footer={true} />
              <div className={classes.informacionSeccion}>
                <Correo footer={true} />
              </div>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
