import { makeStyles, Typography } from "@material-ui/core";
import React, { useState } from "react";

const useStyles = makeStyles((theme) => ({
  inputTextoBuscar: {
    borderRadius: "5px",
    width: "300px",
    height: "30px",
    textAlign: "center",
  },
  select: {
    height: "30px",
  },
  productosEncontrados: {
    marginTop: "40px",
    marginBottom: "20px",
  },
}));

export const Buscadores = ({
  textoBuscar,
  onCambioTextoBuscar,
  categoriasGenerales,
  catGen,
  onCambioCatGen,
}) => {
  const classes = useStyles();

  return (
    <>
      <div>
        <div>
          <h3>Buscar por nombre</h3>
          <input
            type="text"
            className={classes.inputTextoBuscar}
            value={textoBuscar}
            onChange={onCambioTextoBuscar}
          />
        </div>

        <div>
          <h3>Buscar por categoria general</h3>
          <select
            name="categoriaGeneralId"
            value={catGen}
            onChange={onCambioCatGen}
            className={classes.select}
          >
            {categoriasGenerales &&
              categoriasGenerales.map((el, index) => (
                <option key={index} value={el._id}>
                  {el.label}
                </option>
              ))}
          </select>
        </div>
      </div>
    </>
  );
};
