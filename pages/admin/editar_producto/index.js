import React, { useState, useEffect, useRef } from "react";
import { withIronSession } from "next-iron-session";
import { Layout } from "../../../components/Layout";
import {
  Container,
  makeStyles,
  Button,
  Link,
  Typography,
} from "@material-ui/core";
import { ListaProductosEditar } from "../../../components/Productos/Lista/ListaProductosEditar";
import { Buscadores } from "../../../components/Productos/Busqueda/Buscadores";

import { getAllCategoriasGenerales, getAllProductos } from "../../../lib/api";

import { useFeedbackEditar } from "../../../Helpers/customHooks/useFeedbackEditar";

const useStyles = makeStyles((theme) => ({
  titlePost: {
    marginTop: "20px",
    marginBottom: "60px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "2rem",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.5rem",
    },
  },
  productosEncontrados: {
    marginTop: "40px",
    marginBottom: "20px",
  },
  spanTitlePost: {
    borderBottom: "2px solid #56C62C",
  },
  listItemContainer: {
    "&:hover": {
      boxShadow: "10px 5px 5px gray",
    },
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "start",
    marginTop: "50px",
  },
  divInputs: {
    textAlign: "start",
    marginBottom: "25px",
    display: "inline",
    width: "100%",
    "& label": {
      marginRight: "10px",
      display: "block",
    },
  },
  nombre: {
    width: "300px",
  },
  inputDescripcion: {
    width: "100%",
  },
  input_numerico: {
    width: "80px",
  },
  select: {
    height: "30px",
  },
  uploadedImagen: {
    width: "280px",
    marginBottom: "2rem",
  },
  btnCrear: {
    color: "blue",
    borderColor: "blue",
    marginBottom: "20px",
  },
  btnEditar: {
    color: "green",
  },
  btnVolver: {
    marginTop: "30px",
    marginBottom: "40px",
  },
  // Editar
  inputTextoBuscar: {
    borderRadius: "5px",
    width: "300px",
    height: "30px",
    textAlign: "center",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));


const editarproductoPage = ({ categoriasGenerales, productosApi }) => {
  const classes = useStyles();

  const [feedback, feedbackDispatch] = useFeedbackEditar();

  const [textoBuscar, setTextoBuscar] = React.useState("");

  const [productosFiltrados, setProductosFiltrados] = React.useState([]);
  const [catGen, setCatGen] = useState(categoriasGenerales[0]._id);

  useEffect(() => {
    if (textoBuscar === "") {
      // Solo buscar por CategoriaGeneral
      if (catGen === "null") {
        setProductosFiltrados(productosApi);
      } else {
        const productosFiltrados = productosApi.filter((producto) => {
          return producto._id_categoria_general === catGen;
        });
        setProductosFiltrados(productosFiltrados);
      }
    } else {
      // Buscar por texto y por categoria general
      if (catGen !== "null") {
        const productosFiltrados = productosApi
          .filter((producto) => {
            return producto.nombre
              .toLowerCase()
              .includes(textoBuscar.toLowerCase());
          })
          .filter((producto) => {
            return producto._id_categoria_general === catGen;
          });
        setProductosFiltrados(productosFiltrados);
      } else {
        const productosFiltrados = productosApi.filter((producto) => {
          return producto.nombre
            .toLowerCase()
            .includes(textoBuscar.toLowerCase());
        });
        setProductosFiltrados(productosFiltrados);
      }
    }
  }, [textoBuscar, catGen]);

  // BUSCADOR
  const onCambioTextoBuscar = (e) => {
    setTextoBuscar(e.target.value);
  };

  const onCambioCatGen = (e) => {
    setCatGen(e.target.value);
  };

  return (
    <>
      <Layout>
        <Container style={{ marginTop: "30px", minHeight: "70vh" }}>
          <Typography
            variant="h4"
            color="secondary"
            className={classes.titlePost}
          >
            <span className={classes.spanTitlePost}>Editar producto</span>
          </Typography>

          <Buscadores
            textoBuscar={textoBuscar}
            onCambioTextoBuscar={onCambioTextoBuscar}
            categoriasGenerales={categoriasGenerales}
            catGen={catGen}
            onCambioCatGen={onCambioCatGen}
          />

          <Typography
            variant="h5"
            color="primary"
            className={`${classes.titlePost} ${classes.productosEncontrados}`}
          >
            Productos encontrados
          </Typography>

          <ListaProductosEditar
            productosFiltrados={productosFiltrados}
            editar={true}
          />

          <Link href="/admin/menu">
            <Button
              variant="outlined"
              color="primary"
              className={classes.btnVolver}
              onClick={() => feedbackDispatch({ type: "ABRIR_BACKDROP" })}
            >
              Volver al menu
            </Button>
          </Link>
        </Container>
      </Layout>
    </>
  );
};

export const getServerSideProps = withIronSession(
  async ({ req, res }) => {
    const user = req.session.get("user");

    if (!user) {
      res.setHeader("location", "/admin");
      res.statusCode = 302;
      res.end();
      return { props: {} };
    }

    const categoriasGenerales = await getAllCategoriasGenerales();
    categoriasGenerales.unshift({ _id: "null", label: "Ninguno" });
    
    const allProductos = await getAllProductos();

    return {
      props: {
        user,
        productosApi: allProductos,
        categoriasGenerales,
      },
    };
  },
  {
    cookieName: "MYSITECOOKIE",
    cookieOptions: {
      secure: false,
    },
    password: process.env.APPLICATION_SECRET,
  }
);

export default editarproductoPage;
