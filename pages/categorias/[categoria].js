import React, { useState, useEffect } from "react";

import { Layout } from "../../components/Layout";
import { SinProductos } from "../../components/Productos/SinProductos";
import { GridProductos } from "../../components/Productos/Grid/GridProductos";
import { AcordeonSubcategorias } from "../../components/Productos/Grid/AcordeonSubcategorias";

import {
  Container,
  makeStyles,
  Typography,
  Grid,
  Tooltip,
  Snackbar,
} from "@material-ui/core";

import { getCategoriasGeneralesUriLabel, getAllTipos } from "../../lib/api";

import {
  getProductosPorCategoriaGeneralUriLabel,
  getCategoriaGeneralPorUriLabel,
  getSubcategoriasYTiposDeCategoriaGeneral,
} from "../../lib/helpers";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: "80vh",
    marginBottom: "50px",
  },
  titlePost: {
    marginTop: "30px",
    marginBottom: "60px",
    cursor: "pointer",
    [theme.breakpoints.down("sm")]: {
      fontSize: "2rem",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.5rem",
    },
  },
  spanTitlePost: {
    borderBottom: "2px solid #56C62C",
  },
  accordionContainer: {
    [theme.breakpoints.down("sm")]: {
      margin: "0 auto",
    },
    [theme.breakpoints.down("xs")]: {
      margin: "0 auto",
    },
  },
  informacionFiltrado: {
    marginBottom: "20px",
  },
}));

export default function CategoriaGeneralPage(props) {
  const classes = useStyles();

  const [productos, setProductos] = useState(props.productosApi);
  const [subcategoriaActual, setSubcategoriaActual] = useState("");
  const [tipoActual, setTipoActual] = useState("");
  const [expanded, setExpanded] = React.useState(false);
  const [openSuccesSnackbar, setOpenSuccesSnackbar] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const onCategoriaGeneralAllProductos = () => {
    setProductos(props.productosApi);
    setSubcategoriaActual("");
    setTipoActual("");
  };

  const handleCloseSuccesSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSuccesSnackbar(false);
  };

  const getTodos = (el) => {
    // console.log("subcategoria recibida en todos", el)
    const subcategoriaId = el.subcategoria._id;
    const productosFiltrados = props.productosApi.filter((producto) => {
      return (
        producto.has_subcategoria &&
        producto._id_subcategoria === subcategoriaId
      );
    });
    setProductos(productosFiltrados);

    setSubcategoriaActual(el.subcategoria.label);
    setOpenSuccesSnackbar(true);
    if (tipoActual !== "") {
      setTipoActual("");
    }
  };

  const getPorTipo = (tipo, subcategoria) => {
    const subcategoriaId = subcategoria.subcategoria._id;
    const productosFiltrados = props.productosApi.filter((producto) => {
      return (
        producto.has_subcategoria &&
        producto._id_subcategoria === subcategoriaId &&
        producto.tipo === tipo.valor
      );
    });
    setProductos(productosFiltrados);

    setSubcategoriaActual(subcategoria.subcategoria.label);
    setTipoActual(tipo.label);
    setOpenSuccesSnackbar(true);
  };

  const informacionFiltrado = () => (
    <div className={classes.informacionFiltrado}>
      {subcategoriaActual !== "" && (
        <span>
          <b>{subcategoriaActual}</b>
        </span>
      )}
      {tipoActual !== "" && (
        <span>
          {" "}
          <b> {"->"} </b> {tipoActual}
        </span>
      )}
    </div>
  );

  return (
    <>
      <Layout>
        <Container className={classes.container}>
          <Typography
            variant="h4"
            color="secondary"
            className={classes.titlePost}
            onClick={onCategoriaGeneralAllProductos}
          >
            <Tooltip title="Ver todos" placement="right">
              <span className={classes.spanTitlePost}>
                {props.categoriaGeneral && props.categoriaGeneral.label}
              </span>
            </Tooltip>
          </Typography>

          {props.subcategorias && props.subcategorias.length === 0 ? (
            <Grid container>
              {productos && productos.length === 0 ? (
                <Grid item xs={12}>
                  {informacionFiltrado()}
                  <SinProductos />
                </Grid>
              ) : (
                <Grid item xs={12} className={classes.accordionContainer}>
                  {informacionFiltrado()}
                  <GridProductos productos={productos} />
                </Grid>
              )}
            </Grid>
          ) : (
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                {props.subcategorias &&
                  props.subcategorias.map((subcategoria, index) => {
                    return (
                      <AcordeonSubcategorias
                        handleChange={handleChange}
                        expanded={expanded}
                        key={index}
                        subcategoria={subcategoria}
                        getTodos={getTodos}
                        getPorTipo={getPorTipo}
                      />
                    );
                  })}
              </Grid>

              {productos && productos.length === 0 ? (
                <Grid item xs={8}>
                  {informacionFiltrado()}
                  <SinProductos />
                </Grid>
              ) : (
                <Grid item xs={8} className={classes.accordionContainer}>
                  {informacionFiltrado()}
                  <GridProductos productos={productos} />
                </Grid>
              )}
            </Grid>
          )}
        </Container>
      </Layout>

      <Snackbar
        open={openSuccesSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSuccesSnackbar}
      >
        <Alert onClose={handleCloseSuccesSnackbar} severity="success">
          {subcategoriaActual} {tipoActual !== "" && `> ${tipoActual}`}
        </Alert>
      </Snackbar>
    </>
  );
}

export async function getStaticProps({ params }) {
  const { categoria: categoriaUrl } = params;
  const productosApi = await getProductosPorCategoriaGeneralUriLabel(
    categoriaUrl
  );
  const categoriaGeneral = await getCategoriaGeneralPorUriLabel(categoriaUrl);
  const subcategorias = await getSubcategoriasYTiposDeCategoriaGeneral(
    categoriaGeneral._id
  );
  const allTipos = await getAllTipos();

  return {
    props: {
      productosApi: productosApi,
      categoriaGeneral: {
        label: categoriaGeneral.label,
        _id: categoriaGeneral._id,
      },
      subcategorias: subcategorias,
      allTipos,
    },
  };
}

export async function getStaticPaths() {
  const allCategoriasGeneralesUriLabel = await getCategoriasGeneralesUriLabel();

  return {
    paths:
      allCategoriasGeneralesUriLabel.map(
        (el) => `/categorias/${el.uri_label}`
      ) || [],
    fallback: true,
  };
}
