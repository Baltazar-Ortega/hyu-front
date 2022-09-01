import {
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
import { fechaDeEpochADate } from "../../../lib/helpers";
  
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
  
  export const ListaOfertasEditar = ({
    ofertasFiltradas,
    setOfertaAEditar,
    editar,
  }) => {
    const classes = useStyles();
  
    const [dense, setDense] = React.useState(false);
  
    return (
      <div>
        {ofertasFiltradas.length > 0 ? (
          ofertasFiltradas.map((oferta, index) => {
            return (
              <List dense={dense} key={index}>
                <div className={classes.listItemContainer}>
                  <ListItem>
                    <ListItemText
                      primary={oferta.titulo}
                      secondary={`Fecha de vencimiento: ${fechaDeEpochADate(oferta.fecha_vencimiento)}`}
                    />
                    <ListItemSecondaryAction>
                      {editar && (
                        <IconButton
                          edge="start"
                          aria-label="edit"
                          onClick={() => setOfertaAEditar(oferta)}
                        >
                          <EditIcon className={classes.btnEditar} />
                        </IconButton>
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider component="li" />
                </div>
              </List>
            );
          })
        ) : (
          <h4>No hay ofertas por el momento</h4>
        )}
      </div>
    );
  };