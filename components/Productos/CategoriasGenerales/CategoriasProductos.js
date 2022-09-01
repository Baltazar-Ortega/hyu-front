import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Backdrop from "@material-ui/core/Backdrop";

import { CardCategoriaGeneral } from "./CardCategoriaGeneral";
import { CircularCoverBackdrop } from "../../Helpers/CircularCoverBackdrop";


const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "40px",
    marginBottom: "40px",
  },
  titleCategorias: {
    // borderBottom: "2px solid #56C62C",
    [theme.breakpoints.down("sm")]: {
      fontSize: "2rem",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.5rem",
    },
  },
  spanTitleCategorias: {
    borderBottom: "2px solid #56C62C",
  },
  containerCards: {
    display: "flex",
    flexDirection: "column",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));



export const CategoriasProductos = () => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div className={classes.root}>
      <Typography
        variant="h4"
        color="secondary"
        className={classes.titleCategorias}
      >
        <span className={classes.spanTitleCategorias}>
          Categorias de productos
        </span>
      </Typography>

      <div className={classes.containerCards}>
        <CardCategoriaGeneral
          direction="right"
          label="Proteccion Covid"
          listProductos={[
            "Cubrebocas",
            "Termómetro",
            "Overol desechable",
            "Pruebas rápidas",
          ]}
          valor="covid"
          handleToggle={handleToggle}
          imageUrl="/images/categoriasGenerales/proteccionCovid/covid3.png"
        />

        <CardCategoriaGeneral
          direction="left"
          label="Quimicos Industriales"
          listProductos={[
            "Adhesivos",
            "Selladores",
            "Lubricantes",
            "Silicones industriales",
          ]}
          valor="quimicos_industriales"
          handleToggle={handleToggle}
          imageUrl="/images/categoriasGenerales/quimicosIndustriales/quimicosIndustriales.jpg"
        />

        <CardCategoriaGeneral
          direction="right"
          label="Seguridad Industrial"
          listProductos={["Cascos", "Guantes", "Tapetes", "Contenedores"]}
          valor="seguridad_industrial"
          handleToggle={handleToggle}
          imageUrl="/images/categoriasGenerales/seguridadIndustrial/seguridadIndustrial.png"
        />

        <CardCategoriaGeneral
          direction="left"
          label="Fertilizantes Organicos"
          listProductos={[
            "Hidrogeles",
            "Chito-Crece",
            "Chito-Fe",
            "Chitro-Micros",
          ]}
          valor="fertilizantes_organicos"
          handleToggle={handleToggle}
          imageUrl="/images/categoriasGenerales/fertilizantesOrganicos/fertilizantesOrganicos.jpg"
        />

        <CardCategoriaGeneral
          direction="right"
          label="Limpieza"
          listProductos={[
            "Cloro",
            "Pinol",
            "Limpiadores",
            "Detergentes liquidos",
          ]}
          valor="limpieza"
          handleToggle={handleToggle}
          imageUrl="/images/categoriasGenerales/limpieza/limpieza.jpg"
        />

        <CardCategoriaGeneral
          direction="left"
          label="Jarceria"
          listProductos={["Trapeadores", "....", ".....", "....."]}
          valor="jarceria"
          handleToggle={handleToggle}
          imageUrl="/images/categoriasGenerales/jarceria/jarceria.png"
        />
      </div>

      <CircularCoverBackdrop 
      open={open}
      handleClose={handleClose}
      />
      
    </div>
  );
};
