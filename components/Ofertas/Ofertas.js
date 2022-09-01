import React from "react";

import { Container, makeStyles, Typography } from "@material-ui/core";
import { ListaOfertasPage } from "./Lista/ListaOfertasPage";

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: "70vh",
    marginBottom: "50px",
    marginTop: "60px",
  },
  titleOfertas: {
    marginBottom: "70px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "2rem",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.5rem",
    },
  },
  spanOfertas: {
    borderBottom: "2px solid #56C62C",
  },
}));

export const Ofertas = (props) => {
  const classes = useStyles();
  
  return (
    <Container className={classes.container}>
      <Typography
        variant="h4"
        color="secondary"
        className={classes.titleOfertas}
      >
        <span className={classes.spanOfertas}>Ofertas</span>
      </Typography>

        <ListaOfertasPage 
        ofertas={props.allOfertas}
        />
    </Container>
  );
};
