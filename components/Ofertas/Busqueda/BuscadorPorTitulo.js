import { makeStyles, Typography } from "@material-ui/core";
import React from "react";

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
  spanTitlePost: {
    borderBottom: "2px solid #56C62C",
  },
  inputTextoBuscar: {
    borderRadius: "5px",
    width: "300px",
    height: "30px",
    textAlign: "center",
  },
  ofertasEncontradas: {
    marginTop: "40px",
    marginBottom: "20px",
  },
}));

export const BuscadorPorTitulo = ({ textoBuscar, onCambioTextoBuscar }) => {
  const classes = useStyles();

  return (
    <div>
      <div>
        <h3>Buscar por titulo</h3>
        <input
          type="text"
          className={classes.inputTextoBuscar}
          value={textoBuscar}
          onChange={onCambioTextoBuscar}
        />
      </div>
      <Typography
        variant="h5"
        color="primary"
        className={`${classes.titlePost} ${classes.ofertasEncontradas}`}
      >
        Ofertas encontradas
      </Typography>
    </div>
  );
};
