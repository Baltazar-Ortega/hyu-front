import React from "react";
import { Typography, makeStyles } from "@material-ui/core";
import { Telefonos } from "./Telefonos";
import { Correo } from "./Correo";

const useStyles = makeStyles((theme) => ({
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
    marginTop: "10px"
  },
  iconoYDatos: {
    display: "flex",
    "& span": {
      marginLeft: "10px"
    }
  },
}));

export const InformacionContacto = () => {
  const classes = useStyles();
  return (
    <>
      <Typography variant="h5" className={classes.subtitleSeccion}>
        Ventas
      </Typography>
      <div className={classes.informacionSeccion}>
        <Telefonos footer={false} />
      </div>
      <div className={classes.informacionSeccion}>
        <Correo footer={false} />
      </div>
      <p className={classes.informacionSeccion}>
        Gerente de ventas: Ing. Uriel A. Ortega Vazquez
      </p>
      <Typography variant="h5" className={classes.subtitleSeccion}>
        Ubicación
      </Typography>
      <p className={classes.informacionSeccion}>
        Av. Don Juan Saade Murra # 635 <br />
        Saltillo, Coah., México. C.P. 25204
      </p>
    </>
  );
};
