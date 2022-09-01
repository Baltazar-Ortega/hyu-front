import React, { useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import * as gtag from '../../utils/gtag'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  divInputs: {
    textAlign: "start",
    marginBottom: "15px",
    "& label": {
      marginRight: "10px",
    },
  },
  inputMensaje: {
    width: "100%",
  },
  buttonEnviar: {
    color: "white",
    backgroundColor: theme.palette.primary.dark,
    padding: "10px",
    paddingRight: "20px",
    paddingLeft: "20px",
    fontWeight: "700",
    borderRadius: "10px",
    fontSize: ".9rem",
    cursor: 'pointer'
  },
}));

export const Formulario = () => {
  const classes = useStyles();

  const [enviado, setEnviado] = useState(false);

  const [state, setState] = useState({
    nombre: "",
    personEmail: "",
    telefono: "",
    empresa: "",
    asunto: "cotizacion",
    mensaje: "",
  });

  const [open, setOpen] = React.useState(false);


  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    setEnviado(false)
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState({
      ...state,
      [name]: value,
    });
    
  };

  const handlePress = async () => {
    // e.preventDefault()

    gtag.event({
      action: 'submit_form',
      category: 'Contact',
      label: this.state.asunto,
    })
    
    await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre: state.nombre,
        personEmail: state.personEmail,
        telefono: state.telefono,
        empresa: state.empresa,
        asunto: state.asunto,
        mensaje: state.mensaje,
      }),
    });
    setState({
      nombre: "",
      personEmail: "",
      telefono: "",
      empresa: "",
      asunto: "cotizacion",
      mensaje: "",
    });
    setEnviado(true);
    setOpen(true)
  };

  return (
    <div>
      <div className={classes.divInputs}>
        <label>Nombre</label>
        <input
          type="text"
          name="nombre"
          value={state.nombre}
          onChange={handleChange}
        />
      </div>

      <div className={classes.divInputs}>
        <label>Email</label>
        <input
          type="email"
          name="personEmail"
          value={state.personEmail}
          onChange={handleChange}
        />
      </div>

      <div className={classes.divInputs}>
        <label>Telefono</label>
        <input
          type="text"
          name="telefono"
          value={state.telefono}
          onChange={handleChange}
        />
      </div>

      <div className={classes.divInputs}>
        <label>Empresa</label>
        <input
          type="text"
          name="empresa"
          value={state.empresa}
          onChange={handleChange}
        />
      </div>

      <div className={classes.divInputs}>
        <label>Asunto</label>
        <select
          name="asunto"
          id="asunto"
          value={state.asunto}
          onChange={handleChange}
        >
          <option value="cotizacion">Solicitar una cotizacion</option>
          <option value="sugerencias">Sugerencias</option>
          <option value="otrs">Otros</option>
        </select>
      </div>

      <div className={classes.divInputs}>
        <label>Mensaje</label>
        <br />
        <textarea
          name="mensaje"
          rows="6"
          className={classes.inputMensaje}
          value={state.mensaje}
          onChange={handleChange}
        ></textarea>
      </div>
      {enviado ? (
        <Snackbar open={open} autoHideDuration={8000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            ¡Gracias! Leeremos tu mensaje a la brevedad
          </Alert>
        </Snackbar>
      ) : (
        <button onClick={handlePress} className={classes.buttonEnviar}>
          Enviar
        </button>
      )}

    </div>
  );
};
