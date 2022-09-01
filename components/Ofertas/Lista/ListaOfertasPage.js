import { makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { fechaDeEpochADate } from "../../../lib/helpers";

const useStyles = makeStyles((theme) => ({
  containerOfertas: {},
  containerInformacionOferta: {
    textAlign: "start",
    border: "2px solid gray",
    paddingLeft: "10px",
    paddingright: "10px",
    marginBottom: "20px",
  },
  descripcion: {
    whiteSpace: "pre-line",
    textOverflow: "clip",
    wordWrap: "break-word",
    fontSize: "1rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.800rem"
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.700rem"
    },
  },
  fechaVencimiento: {
    fontSize: "1.2rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.900rem"
    },
  },
  imagen: {
    width: "80%",
    height: "400px",
    [theme.breakpoints.down("sm")]: {
      width: "85%",
      height: "300px",
    },
    [theme.breakpoints.down("xs")]: {
      width: "90%",
      height: "200px",
    },
  },
  precio: {
    marginTop: "30px",
    marginBottom: "40px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.6rem",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.4rem",
    },
  },
}));

export const ListaOfertasPage = ({ ofertas }) => {
  const classes = useStyles();

  return (
    <div className={classes.containerOfertas}>
      {ofertas.length > 0 ? (
        ofertas.map((oferta, index) => {
          return (
            <div key={index} className={classes.containerInformacionOferta}>
              <h1>{oferta.titulo}</h1>
              {oferta.descripcion !== "" && (
                <p className={classes.descripcion}>{oferta.descripcion}</p>
              )}
              <p className={classes.fechaVencimiento}>
                Fecha de vencimiento:{"   "}
                <b>{fechaDeEpochADate(oferta.fecha_vencimiento)}</b>
              </p>
              <img className={classes.imagen} src={`${oferta.imagenUrl}`} />
              <Typography
                variant="h5"
                color="secondary"
                className={classes.precio}
              >
                Precio: <strong>{oferta.precio} MXN</strong>
              </Typography>
            </div>
          );
        })
      ) : (
        <Typography variant="h5" color="secondary" className={classes.precio}>
          No hay ofertas por el momento
        </Typography>
      )}
    </div>
  );
};
