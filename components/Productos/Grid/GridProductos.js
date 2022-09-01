import React, { useState } from "react";
import { makeStyles, Grid, Button } from "@material-ui/core";
import { CardProducto } from "./CardProducto";
import { CircularCoverBackdrop } from "../../Helpers/CircularCoverBackdrop";
import { ControlVer } from "../Utilidades/ControlVer";

const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
    justifyContent: "center",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  containerBtnVer: {
    display: "flex",
    justifyContent: "space-evenly",
  },
  btnVer: {
    marginTop: "30px",
    marginBottom: "40px",
    color: "blue",
    borderColor: "blue",
  },
}));

export const GridProductos = (props) => {
  const classes = useStyles(props);

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  const cantidadInicial = 10;
  const [mostrar, setMostrar] = React.useState(cantidadInicial);

  const mostrarMas = () => {
    setMostrar((mostrar) => mostrar + cantidadInicial);
  };

  const mostrarMenos = () => {
    setMostrar((mostrar) => mostrar - cantidadInicial);
  };

  return (
    <>
      <Grid
        container
        spacing={2}
        id="contenedorGrid"
        style={{ justifyContent: "center" }}
      >
        {props.productos &&
          props.productos.slice(0, mostrar).map((el, index) => {
            return (
              <Grid item xs={12} sm={6} className={classes.card} key={index}>
                <CardProducto
                  imagenUrl={el.imagenUrl}
                  nombre={el.nombre}
                  slug={el.slug}
                  handleToggle={handleToggle}
                />
              </Grid>
            );
          })}

        <CircularCoverBackdrop open={open} handleClose={handleClose} />
      </Grid>

      {props.productos && (
        <ControlVer
          mostrar={mostrar}
          cantidadInicial={cantidadInicial}
          items={props.productos}
          mostrarMas={mostrarMas}
          mostrarMenos={mostrarMenos}
        />
      )}
    </>
  );
};
