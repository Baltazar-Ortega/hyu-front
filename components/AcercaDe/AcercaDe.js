import React from "react";

import { Valores } from "./Valores";
import { Container } from "@material-ui/core";
import { QuienesSomos } from "../Principal/QuienesSomos";
import { MisionVision } from "./MisionVision";

export const AcercaDe = () => {
  return (
    <Container>
      <QuienesSomos littleSubrayado={false} />
      <Valores />
      <MisionVision />
    </Container>
  );
};
