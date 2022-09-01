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
import { ControlVer } from "../Utilidades/ControlVer";

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

export const ListaProductosEditar = ({ productosFiltrados, editar }) => {
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
      {mostrar > 0 && productosFiltrados.length > 0 ? (
        productosFiltrados.slice(0, mostrar).map((producto, index) => {
          return (
            <>
              <List dense={dense} key={index}>
                <div className={classes.listItemContainer}>
                  <ListItem>
                    <ListItemText
                      primary={producto.nombre}
                      secondary={`Categoria: ${producto.categoriaGeneral.label}`}
                    />
                    <ListItemSecondaryAction>
                      {editar && (
                        <Link
                          href={`/admin/editar_producto/edicion/${producto.slug}`}
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
            </>
          );
        })
      ) : (
        <h4>No se encontraron productos</h4>
      )}

      <ControlVer
        mostrar={mostrar}
        cantidadInicial={cantidadInicial}
        items={productosFiltrados}
        mostrarMas={mostrarMas}
        mostrarMenos={mostrarMenos}
      />
    </div>
  );
};
