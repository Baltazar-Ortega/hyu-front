import { makeStyles, Card, Typography, Button } from "@material-ui/core";
import Link from "next/link";

const useStyles = makeStyles((theme) => ({
    root: {
      width: 380,
      [theme.breakpoints.down("sm")]: {
        width: 350,
      },
      [theme.breakpoints.down("xs")]: {
        width: 400,
      },
      heigth: 380,
      padding: 7,
      paddingTop: 10,
      paddingBottom: 10,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
    },
    imgCard: {
      height: 240,
      width: 300,
      [theme.breakpoints.down("sm")]: {
        heigth: "100%",
        width: "100%",
      },
    },
    nombreProducto: {
      marginTop: 10,
      fontSize: "1.2rem",
      [theme.breakpoints.down("sm")]: {
        fontSize: "1rem",
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "0.9rem",
      },
    }
  }));


export const CardProducto = (props) => {
    const classes = useStyles(props);
  
    return (
      <Card className={classes.root}>
        <img src={props.imagenUrl} className={classes.imgCard} />
        <Typography
          gutterBottom
          variant="h5"
          component="h2"
          className={classes.nombreProducto}
        >
          {props.nombre}
        </Typography>
        <Link href="/productos/[producto]" as={`/productos/${props.slug}`}>
          <a>
            <Button size="medium" color="primary" onClick={props.handleToggle}>
              Ver mas
            </Button>
          </a>
        </Link>
      </Card>
    );
  };