import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import TripOriginIcon from "@material-ui/icons/TripOrigin";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
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
  textValor: {
    "& span": {
      [theme.breakpoints.down("xs")]: {
        fontSize: ".8rem",
      },
    },
  },
  listItemIcon: {
    [theme.breakpoints.down("xs")]: {
      minWidth: "26px",
    },
  },
  icon: {
    [theme.breakpoints.down("xs")]: {
      width: ".7em",
    },
  },
}));

const Valor = ({ nombre }) => {
  const classes = useStyles();
  return (
    <ListItem button>
      <ListItemIcon className={classes.listItemIcon}>
        <TripOriginIcon className={classes.icon} />
      </ListItemIcon>
      <ListItemText primary={nombre} className={classes.textValor} />
    </ListItem>
  );
};

export const Valores = () => {
  const classes = useStyles();

  return (
    <div>
      <Typography
        variant="h4"
        color="secondary"
        className={classes.titleCategorias}
      >
        <span className={classes.spanTitleCategorias}>Nuestros valores</span>
      </Typography>

      <div className={classes.root}>
        <List component="nav" aria-label="main mailbox folders">
          <Valor nombre="Honestidad" />
          <Valor nombre="Calidad" />
          <Valor nombre="Responsabilidad" />
          <Valor nombre="Trabajo en equipo" />
        </List>
      </div>
    </div>
  );
};
