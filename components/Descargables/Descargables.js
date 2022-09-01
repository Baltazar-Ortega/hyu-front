import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { getAllDescargables } from "../../lib/api";
import DescriptionIcon from "@material-ui/icons/Description";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "45px",
    marginBottom: "60px",
  },
  title: {
    marginBottom: "25px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "2rem",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.5rem",
    },
  },
  spanTitle: {
    borderBottom: "2px solid #56C62C",
  },
  elementoLista: {
    listStyleType: "none",
    color: "black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "10px",
  },
  iconoContainer: {
    color: "green",
    marginLeft: "10px",
  },
  icono: {
    width: "40px",
    height: "40px",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export const Descargables = () => {
  const classes = useStyles();

  useEffect(() => {
    getDescargables();
  }, []);

  const [descargables, setDescargables] = React.useState([]);

  const getDescargables = async () => {
    const descargablesApi = await getAllDescargables();
    setDescargables(descargablesApi);
    // console.log("descargables: ", descargables);
  };

  return (
    <>
      {descargables && descargables.length > 0 ? (
        <div className={classes.root}>
          <Typography variant="h4" color="secondary" className={classes.title}>
            <span className={classes.spanTitle}>Descargables</span>
          </Typography>

          <div>
            <ul>
              {descargables &&
                descargables.map((descargable, index) => {
                  return (
                    <li className={classes.elementoLista}>
                      <div>{descargable.nombre}</div>
                      <div>
                        <a
                          target="_blank"
                          href={descargable.archivo_url}
                          className={classes.iconoContainer}
                        >
                          <DescriptionIcon className={classes.icono} />
                        </a>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      ) : null}
    </>
  );
};
