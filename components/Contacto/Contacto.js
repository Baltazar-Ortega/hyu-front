import React from 'react'
import { Container, makeStyles } from '@material-ui/core'
import { ElementosContacto } from './ElementosContacto'

const useStyles = makeStyles((theme) => ({
    backgroundImage: {
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center center",
      backgroundSize: "cover",
      backgroundImage: `url(${require("../../public/images/fondoContactoOscuro.jpg")})`,
    //   backgroundImage: `url('/images/heroFondoMasOscuro.jpg')`,
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    }
}))

export const Contacto = () => {
const classes = useStyles()

    return (
        <div className={classes.backgroundImage}>
        <Container>
            <ElementosContacto />
        </Container>
        </div>
    )
}
