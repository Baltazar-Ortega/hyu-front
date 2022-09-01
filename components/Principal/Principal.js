import React from "react";
import { Hero } from "./Hero";
import { HeroCovid } from "./HeroCovid";
import { Categorias } from "./Categorias";
import { QuienesSomos } from "./QuienesSomos";
import { Container } from "@material-ui/core";
import { Descargables } from "../Descargables/Descargables";


export const Principal = () => {
  return (
    <div>
      <Hero />
      <HeroCovid />
      <Container>
        <Categorias />
        <Descargables />
        <QuienesSomos littleSubrayado={true} />
      </Container>
      
    </div>
  );
};
