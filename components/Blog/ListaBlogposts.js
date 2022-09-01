import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";
import { CircularCoverBackdrop } from "../Helpers/CircularCoverBackdrop";

const useStyles = makeStyles((theme) => ({
  containerBlogposts: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "50px",
  },
  card: {
    width: "43%",
    marginBottom: "50px",
    cursor: "auto",
    [theme.breakpoints.down("sm")]: {
      width: "60%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "75%",
    },
  },
  cardActions: {
    display: "flex",
    justifyContent: "center",
  },
  cardImagen: {
    width: "100%",
    maxHeight: "350px",
  },
  cardTitulo: {
    marginTop: "1.3rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.2rem",
    },
  },
}));

export const ListaBlogposts = ({ blogposts }) => {
  const classes = useStyles();

  const [openBackdrop, setOpenBackdrop] = React.useState(false); // backdrop

  const handleClose = () => {
    setOpenBackdrop(false);
  };

  return (
    <div className={classes.containerBlogposts}>
      {blogposts.length > 0 &&
        blogposts.map((blog, idx) => {
          return (
            <Card className={classes.card} key={idx}>
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                className={classes.cardTitulo}
              >
                {blog.titulo}
              </Typography>
              <img
                className={classes.cardImagen}
                src={blog.imagenPrincipal.imageUrl}
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  {blog.introduccion}
                </Typography>
              </CardContent>
              <CardActions className={classes.cardActions}>
                <Link as={`/blog/${blog.slug}`} href="/blog/[blogpost]">
                  <a>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => setOpenBackdrop(true)}
                    >
                      Leer mas
                    </Button>
                  </a>
                </Link>
              </CardActions>
            </Card>
          );
        })}

      <CircularCoverBackdrop open={openBackdrop} handleClose={handleClose} />
    </div>
  );
};
