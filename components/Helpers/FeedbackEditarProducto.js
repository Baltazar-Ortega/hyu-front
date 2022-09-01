import React from "react";

import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  }));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const FeedbackEditarProducto = ({state, dispatch, borrar}) => {

    const classes = useStyles()
  return (
    <div>
      <Dialog
        open={state.openDialog}
        onClose={() => dispatch({type: 'CERRAR_CONFIRMAR_ELIMINACION'})}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Cuidado</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Estas seguro de querer eliminar el producto?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => borrar()}
            style={{ color: "red" }}
            autoFocus
          >
            Si
          </Button>
          <Button onClick={() => dispatch({type: 'CERRAR_CONFIRMAR_ELIMINACION'})} color="primary" autoFocus>
            Salir
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={state.openSuccesSnackbar}
        autoHideDuration={6000}
        onClose={() =>
          dispatch({ type: "CERRAR_EDITADO_SATISFACTORIO" })
        }
      >
        <Alert
          onClose={() =>
            dispatch({ type: "CERRAR_EDITADO_SATISFACTORIO" })
          }
          severity="success"
        >
          Producto editado en la base de datos exitosamente
        </Alert>
      </Snackbar>

      <Snackbar
        open={state.openWarningSnackbar}
        autoHideDuration={8000}
        onClose={() => dispatch({ type: "CERRAR_WARNING" })}
      >
        <Alert
          onClose={() => dispatch({ type: "CERRAR_WARNING" })}
          severity="warning"
        >
          El nombre que colocaste ya lo tiene un producto. Escribe otro
        </Alert>
      </Snackbar>

      <Snackbar
        open={state.openErrorEditadoSnackbar}
        autoHideDuration={6000}
        onClose={() => dispatch({ type: "CERRAR_ERROR_EDITADO" })}
      >
        <Alert
          onClose={() => dispatch({ type: "CERRAR_ERROR_EDITADO" })}
          severity="error"
        >
          Error. No se logro editar el producto. 
        </Alert>
      </Snackbar>

      <Snackbar
        open={state.openErrorSnackbar}
        autoHideDuration={6000}
        onClose={() => dispatch({ type: "CERRAR_ERROR" })}
      >
        <Alert
          onClose={() => dispatch({ type: "CERRAR_ERROR" })}
          severity="error"
        >
          Debe llenar todos los campos
        </Alert>
      </Snackbar>

      <Snackbar
        open={state.openDeletedSuccessSnackbar}
        autoHideDuration={6000}
        onClose={() => dispatch({type: "CERRAR_ELEMENTO_ELIMINADO"})}
      >
        <Alert onClose={() => dispatch({type: "CERRAR_ELEMENTO_ELIMINADO"})} severity="success">
          Producto eliminado de la base de datos
        </Alert>
      </Snackbar>

      <Backdrop
        className={classes.backdrop}
        open={state.openBackdrop}
        onClick={() => dispatch({ type: "CERRAR_BACKDROP" })}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};
