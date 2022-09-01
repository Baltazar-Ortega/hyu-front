import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Typography, Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: "45px",
  },
  hero: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  titleInformacion: {
    color: theme.palette.secondary.dark,
    fontWeight: "700",
    borderBottom: (props) =>
      props.littleSubrayado ? "" : `1.5px solid ${theme.palette.primary.main}`,
    "& span": {
      borderBottom: (props) =>
        props.littleSubrayado
          ? `1.5px solid ${theme.palette.primary.main}`
          : "",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.5rem",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.2rem",
    },
  },
  informacion: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.9rem",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.7rem",
    },
  },
  containerImg: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    height: "300px",
    width: "auto",
    marginTop: "10px",
    marginBottom: "10px",
    [theme.breakpoints.down("sm")]: {
      height: "240px",
    },
    [theme.breakpoints.down("xs")]: {
      height: "170px",
    },
  },
}));

export const QuienesSomos = (props) => {
  const classes = useStyles(props);

  return (
    <>
      <Box className={classes.root} mb={4}>
        <Grid container spacing={5}>
          <Grid item xs={12} md={6} className={classes.hero}>
            <Box className={classes.paper}>
              <Typography variant="h4" className={classes.titleInformacion}>
                <span>¿Quienes somos?</span>
              </Typography>
              <p className={classes.informacion}>
                Somos una distribuidora/comercializadora de productos organicos
                para mejorar sus cultivos y aumentar el rendimiento de estos sin
                necesidad de aplicar exceso de quimicos: ademas, distribuimos
                productos para la seguridad industrial y contra el COVID-19, asi
                como productos para la limpieza del hogar y la industria.
              </p>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            className={classes.containerImg}
            style={{ paddingTop: "0px" }}
          >
            <img src="/images/logo_vertical.jpg" className={classes.img} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
