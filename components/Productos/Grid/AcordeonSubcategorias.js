import React, { useState } from "react";

import { makeStyles, Typography } from "@material-ui/core";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles((theme) => ({
  accordion: {
    border: `2px solid ${theme.palette.secondary.light}`,
  },
  subcategoriaLabel: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const ListaTipos = (props) => {
  return (
    <div>
      {props.tipos.lista.map((tipo, index) => {
        return (
          <ListItem
            button
            key={index}
            onClick={() => props.getPorTipo(tipo, props.subcategoria)}
          >
            <ListItemText primary={tipo.label} />
          </ListItem>
        );
      })}
    </div>
  );
};

export const AcordeonSubcategorias = ({
  subcategoria,
  getTodos,
  getPorTipo,
  expanded,
  handleChange,
}) => {
  const classes = useStyles();

  return (
    <Accordion
      className={classes.accordion}
      expanded={expanded === subcategoria.subcategoria.label}
      onChange={handleChange(subcategoria.subcategoria.label)}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography className={classes.subcategoriaLabel}>
          {subcategoria.subcategoria.label}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List component="nav" aria-label="main mailbox folders">
          <ListItem button onClick={() => getTodos(subcategoria)}>
            <ListItemText primary="Todos" />
          </ListItem>

          {subcategoria.tipos && (
            <ListaTipos
              tipos={subcategoria.tipos}
              getPorTipo={getPorTipo}
              subcategoria={subcategoria}
            />
          )}
        </List>
      </AccordionDetails>
    </Accordion>
  );
};
