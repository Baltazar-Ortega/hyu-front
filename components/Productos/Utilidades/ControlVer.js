import { Button, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  containerBtnVer: {
    display: "flex",
    justifyContent: "space-evenly",
  },
  btnVer: {
    marginTop: "30px",
    marginBottom: "40px",
    color: "blue",
    borderColor: "blue",
    [theme.breakpoints.down("xs")]: {
      fontSize: "10px"
    },
  },
}));

export const ControlVer = ({
  mostrar,
  cantidadInicial,
  items,
  mostrarMas,
  mostrarMenos,
}) => {
  const classes = useStyles();

  return (
    <div>
      {mostrar >= cantidadInicial && items.length > cantidadInicial && (
        <div className={classes.containerBtnVer}>
          {mostrar < items.length && ( // Ej. mostrar: 100 length: 102
            <Button
              variant="outlined"
              primary=""
              className={classes.btnVer}
              onClick={mostrarMas}
            >
              Ver mas
            </Button>
          )}

          {mostrar !== cantidadInicial && (
            <Button
              variant="outlined"
              primary=""
              className={classes.btnVer}
              onClick={mostrarMenos}
            >
              Ver menos
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
