import React from "react";
import { Container } from "@material-ui/core";
import { CategoriasProductos } from "./CategoriasGenerales/CategoriasProductos.js";
import { Descargables } from "../Descargables/Descargables.js";

export const Productos = () => {
  return (
    <Container>
      <Descargables />
      <CategoriasProductos />
    </Container>
  );
};
