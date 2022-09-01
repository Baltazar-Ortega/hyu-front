import React from 'react'
import { makeStyles, Card } from '@material-ui/core';
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Box, Button } from "@material-ui/core";
import Link from 'next/link';


const useStyles = makeStyles((theme) => ({
    cardCategoria: {
      display: "flex",
      height: "250px",
      width: "70%",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: "80px",
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
      [theme.breakpoints.down("sm")]: {
        height: "190px",
      },
      [theme.breakpoints.down("xs")]: {
        height: "170px",
      },
    },
    cardCategoriaRight: {
      marginLeft: "30%",
      [theme.breakpoints.down("md")]: {
        marginLeft: "0%",
      },
    },
  
    titleInformacion: {
      [theme.breakpoints.down("sm")]: {
        fontSize: "1.3rem",
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "1rem",
        marginBottom: "0.5rem",
      },
    },
    informacion: {
      display: "flex",
      flexDirection: "column",
      marginRight: "12px",
      [theme.breakpoints.down("sm")]: {
        fontSize: "1rem",
        padding: "9px",
        width: "100%",
        height: "100%",
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "0.7rem",
      },
    },
    listProductos: {
      listStyle: "none",
      paddingLeft: "0px",
      fontSize: "17px",
      [theme.breakpoints.down("sm")]: {
        fontSize: "13px",
        marginTop: "10px",
        marginBottom: "0px",
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "11px",
        marginTop: "0px",
        marginBottom: "0px",
      },
    },
    imgCard: {
      width: "50%",
      height: "100%",
      [theme.breakpoints.down("md")]: {
        width: "40%",
      },
      [theme.breakpoints.down("sm")]: {
        height: "95%",
        width: "45%",
      },
      [theme.breakpoints.down("xs")]: {
        height: "75%",
      },
    },
    boxContainer: {
      display: "flex",
      justifyContent: "center",
      marginTop: "10px",
      [theme.breakpoints.down("sm")]: {
        marginTop: "10px",
      },
      "& button": {
        [theme.breakpoints.down("xs")]: {
          fontSize: "0.6rem",
        },
      },
    },
  }));

export const CardCategoriaGeneral = (props) => {
    const classes = useStyles();
  
    return (
      <Card
        className={
          props.direction === "right"
            ? `${classes.cardCategoria} ${classes.cardCategoriaRight} `
            : `${classes.cardCategoria}`
        }
        sm={12}
      >
        {props.direction === "left" && (
          <img src={props.imageUrl} className={classes.imgCard} />
        )}
  
        <CardContent className={classes.informacion}>
          <Typography
            component="h5"
            variant="h5"
            className={classes.titleInformacion}
          >
            {props.label}
          </Typography>
          <ul className={classes.listProductos}>
            {props.listProductos.map((producto, index) => (
              <li key={index}>{producto}</li>
            ))}
          </ul>
  
          <Link as={`/categorias/${props.valor}`} href="/categorias/[categoria]">
            <a>
            <Box mt={4} className={classes.boxContainer}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={props.handleToggle}
              >
                Ver mas
              </Button>
            </Box>

            </a>
          </Link>
        </CardContent>
  
        {props.direction === "right" && (
          <img src={props.imageUrl} className={classes.imgCard} />
        )}
      </Card>
    );
  };