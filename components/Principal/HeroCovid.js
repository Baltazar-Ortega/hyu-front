import React, { useState } from "react";
import {
  Container,
  Box,
  makeStyles,
  Typography,
  Button,
  Grid,
  Paper,
  Hidden,
} from "@material-ui/core";
import theme from "../../src/theme";
import Link from "next/link";
import { CircularCoverBackdrop } from "../Helpers/CircularCoverBackdrop";



const useStyles = makeStyles({
  containerCovid: {
    backgroundColor: "#222E9A",
    marginTop: "40px",
    marginBottom: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "15px",
    [theme.breakpoints.down("xs")]: {
      padding: "5px",
    },
  },
  containerInformacion: {
    [theme.breakpoints.down("xs")]: {
      padding: "10px",
    },
  },
  titulo: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.7rem",
      fontWeight: "700",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.2rem",
      fontWeight: "600",
      marginBottom: "5px",
    },
  },
  texto: {
    color: "white",
    textAlign: "start",
    textShadow: "1px 1px black",
    [theme.breakpoints.down("xs")]: {
      fontSize: ".8rem",
    },
  },
  boxButtonContainer: {
    display: "flex",
    "& button": {
      [theme.breakpoints.down("xs")]: {
        fontSize: ".546rem",
      },
    },
  },
  containerImgCovid: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  imgCovid: {
    width: "100%",
    height: "100px",
    borderRadius: "12px",
    [theme.breakpoints.down("xs")]: {
      width: "85%",
    },
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
});

export const HeroCovid = () => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div>
      <Container>
        <Paper elevation={3}>
          <Grid container spacing={5} className={classes.containerCovid}>
            <Grid item xs={6} className={classes.containerInformacion}>
              <Typography
                variant="h4"
                className={`${classes.texto} ${classes.titulo}`}
              >
                Protección contra el COVID-19
              </Typography>
              <Typography variant="subtitle1" className={classes.texto}>
                Nuestros productos cuentan con certificación médica
              </Typography>

              <Link as={`/categorias/covid`} href="/categorias/[categoria]">
                <a>
                  <Box mt={3} className={classes.boxButtonContainer}>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleToggle}
                    >
                      Ver mas
                    </Button>
                  </Box>
                </a>
              </Link>
            </Grid>

            <Grid item xs={6}>
              <Grid container spacing={2}>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  className={classes.containerImgCovid}
                >
                  <img
                    className={classes.imgCovid}
                    src="/images/categoriasGenerales/proteccionCovid/covid3-trans.png"
                  />
                </Grid>

                <Hidden xsDown>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={3}
                    className={classes.containerImgCovid}
                  >
                    <img
                      className={classes.imgCovid}
                      src="/images/categoriasGenerales/proteccionCovid/covid4-trans.png"
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={3}
                    className={classes.containerImgCovid}
                  >
                    <img
                      className={classes.imgCovid}
                      src="/images/categoriasGenerales/proteccionCovid/covid8-trans.png"
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={3}
                    className={classes.containerImgCovid}
                  >
                    <img
                      className={classes.imgCovid}
                      src="/images/categoriasGenerales/proteccionCovid/covid9-trans.png"
                    />
                  </Grid>
                </Hidden>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Container>

      <CircularCoverBackdrop 
      open={open}
      handleClose={handleClose}
      />      
    </div>
  );
};
