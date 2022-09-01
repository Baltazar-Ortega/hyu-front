import React from "react";

import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const FeedbackCrearProducto = ({ state, dispatch }) => {
  const classes = useStyles();
  return (
    <div>
      <Snackbar
        open={state.openSuccesSnackbar}
        autoHideDuration={6000}
        onClose={() => dispatch({ type: "CERRAR_AGREGADO_SATISFACTORIO" })}
      >
        <Alert
          onClose={() => dispatch({ type: "CERRAR_AGREGADO_SATISFACTORIO" })}
          severity="success"
        >
          Producto agregado a la base de datos
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
