import { Typography, makeStyles } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    titlePost: {
      marginTop: "30px",
      marginBottom: "60px",
      cursor: 'pointer',
      [theme.breakpoints.down("sm")]: {
        fontSize: "2rem",
      },
      [theme.breakpoints.down("xs")]: {
        fontSize: "1.5rem",
      },
    },
  }));

export const SinProductos = () => {
    const classes = useStyles();

    return (
      <Typography variant="h4" color="secondary" className={classes.titlePost}>
        No hay productos
      </Typography>
    );
  };