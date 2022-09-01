import PhoneIcon from "@material-ui/icons/Phone";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import { makeStyles } from "@material-ui/core";
import React from "react";
import { globals } from "../../Helpers/globals";

const useStyles = makeStyles((theme) => ({
  container: {},
  containerTelefonos: {
    color: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    fontSize: props => !props.footer ? "1.35rem" : "0.9rem",
    alignItems: props => props.footer ? "center" : "start",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.7rem",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.7rem",
    },
  },
  iconoYNumero: {
    marginTop: "10px",
    display: "flex"
  },
  numero: {
      marginLeft: "10px"
  }
}));

export const Telefonos = (props) => {
  const classes = useStyles(props);

  const { telefonos } = globals;

  return (
    <div className={classes.container}>
      <p style={{ color: "white" }}>Telefonos</p>
      <div className={classes.containerTelefonos}>
        <div className={classes.iconoYNumero}>
          <PhoneIcon /> <span className={classes.numero}>{telefonos.celular}</span>
        </div>
        <div className={classes.iconoYNumero}>
          <WhatsAppIcon /> <span className={classes.numero}>{telefonos.whatsapp}</span> 
        </div>
      </div>
    </div>
  );
};
