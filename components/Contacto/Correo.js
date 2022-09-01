import React from 'react'
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    containerCorreo: {
        color: "white",
    display: "flex",
    justifyContent: props => props.footer ? "center" : "start",
    },
    iconoYDatos: {
        display: "flex",
        "& span": {
          marginLeft: "10px",
        },
    }
}))

export const Correo = (props) => {

    const classes = useStyles(props)
    return (
        <div className={classes.containerCorreo}>
         <div className={classes.iconoYDatos}>
          <MailOutlineIcon />
          <span>venta.clientes@hyubi.com.mx</span>
        </div>   
        </div>
    )
}
