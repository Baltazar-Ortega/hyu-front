import {
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import React from "react";
import Link from "next/link";
import { ControlVer } from "../../Productos/Utilidades/ControlVer";
import {fechaDeEpochADate} from "../../../lib/helpers"

const useStyles = makeStyles((theme) => ({
  listItemContainer: {
    "&:hover": {
      boxShadow: "10px 5px 5px gray",
    },
  },
  btnEditar: {
    color: "green",
  },
}));

export const ListaDescargablesEditar = ({ descargables, editar }) => {
  const classes = useStyles();

  const [dense, setDense] = React.useState(false);

  const cantidadInicial = 6;
  const [mostrar, setMostrar] = React.useState(cantidadInicial);

  const mostrarMas = () => {
    setMostrar((mostrar) => mostrar + cantidadInicial);
  };

  const mostrarMenos = () => {
    setMostrar((mostrar) => mostrar - cantidadInicial);
  };

  return (
    <div>
      {mostrar > 0 && descargables.length > 0 ? (
        descargables.slice(0, mostrar).map((descargable, index) => {
          return (
              <List dense={dense} key={index}>
                <div className={classes.listItemContainer}>
                  <ListItem>
                    <ListItemText
                      primary={descargable.nombre}
                      secondary={`Editado por ultima vez: ${fechaDeEpochADate(descargable.fecha_editado)}`}
                    />
                    <ListItemSecondaryAction>
                      {editar && (
                        <Link
                          href={`/admin/editar_descargable/edicion/${descargable._id}`}
                        >
                          <a target="_blank">
                            <IconButton edge="start" aria-label="edit">
                              <EditIcon className={classes.btnEditar} />
                            </IconButton>
                          </a>
                        </Link>
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider component="li" />
                </div>
              </List>
          );
        })
      ) : (
        <h4>No se encontraron descargables</h4>
      )}

      <ControlVer
        mostrar={mostrar}
        cantidadInicial={cantidadInicial}
        items={descargables}
        mostrarMas={mostrarMas}
        mostrarMenos={mostrarMenos}
      />
    </div>
  );
};