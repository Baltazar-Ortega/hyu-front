import React from "react";
import { Grid, Container, makeStyles, Typography, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    containerMisionVision: {
        marginTop: '30px'
    },
    containerGrid: {
      marginBottom: '20px'
    },
  titleCategorias: {
    textAlign: "start",
    fontSize: "1.7rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.5rem",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.2rem",
    },
  },
  spanTitleCategorias: {
    borderBottom: "2px solid #56C62C",
  },
  containerInformacion: {
    height: '200px',
    padding: '20px'
  },
  texto: {
      textAlign: 'start',
      fontSize: '1rem',
      [theme.breakpoints.down("xs")]: {
        fontSize: "0.8rem",
      },
  }
}));

export const MisionVision = () => {
  const classes = useStyles();
  return (
    <Container className={classes.containerMisionVision}>
      <Grid container spacing={3} className={classes.containerGrid}>
        <Grid item xs={12} sm={6}>
          <Paper  elevation={3} className={classes.containerInformacion}>
          <Typography
            variant="h4"
            color="secondary"
            className={classes.titleCategorias}
          >
            <span className={classes.spanTitleCategorias}>Misión</span>
          </Typography>
          <p className={classes.texto}>
              Dar al cliente el mejor servicio y variedad, calidad y valor de productos industriales y bioagrícolas.
          </p>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} >
          <Paper  elevation={3} className={classes.containerInformacion}>
          <Typography
            variant="h4"
            color="secondary"
            className={classes.titleCategorias}
          >
            <span className={classes.spanTitleCategorias}>Visión</span>
          </Typography>
          <p className={classes.texto}>
              Es crear una sinergia con nuestros clientes que permita que sus necesidades les sean satisfechas.
          </p>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};
