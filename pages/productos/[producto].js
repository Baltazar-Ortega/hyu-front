import { getProductoPorSlug, getAllProductos } from "../../lib/api";
import { Container, Grid, makeStyles, Typography } from "@material-ui/core";
import Link from "next/link";
import { Layout } from "../../components/Layout";
import { CircularCoverBackdrop } from "../../components/Helpers/CircularCoverBackdrop";

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: "70vh",
    marginBottom: "50px",
    marginTop: "60px",
  },
  titlePost: {
    marginTop: "30px",
    marginBottom: "40px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.6rem",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.4rem",
    },
  },
  spanTitlePost: {
    borderBottom: "2px solid #56C62C",
  },
  imgCard: {
    width: "100%",
    minHeight: "320px",
    maxHeight: "370px",
    [theme.breakpoints.down("sm")]: {
      minHeight: "240px",
      maxHeight: "370px",
    },
  },
  containerInformacion: {
    textAlign: "start",
  },
  linkCategoriaGeneral: {
    color: "black",
  },
  linkTexto: {
    "&:hover": {
      borderBottom: `2px solid ${theme.palette.primary.main}`,
    },
  },
  descripcion: {
    whiteSpace: "pre-line"
  },
  solicitarCotizacion: {
    fontSize: 18,
  },
}));

export default function ProductoPage({ producto }) {
  const classes = useStyles();

  const [openBackdrop, setOpenBackdrop] = React.useState(false); // backdrop

  const handleClose = () => {
    setOpenBackdrop(false);
  };

  return (
    <>
      <Layout>
        <Container className={classes.container}>
          {producto ? (
            <Grid container spacing={4}>
              <Grid item xs={12} sm={4}>
                <img src={producto.imagenUrl} className={classes.imgCard} />
              </Grid>
              <Grid
                item
                xs={12}
                sm={8}
                className={classes.containerInformacion}
              >
                <Link
                  as={`/categorias/${producto.categoriaGeneral.uri_label}`}
                  href="/categorias/[categoria]"
                >
                  <a className={classes.linkCategoriaGeneral}>
                    <span
                      className={classes.linkTexto}
                      onClick={() => setOpenBackdrop(true)}
                    >
                      Volver a{" "}
                      <strong>{producto.categoriaGeneral.label}</strong>
                    </span>
                  </a>
                </Link>

                <Typography
                  variant="h5"
                  color="secondary"
                  className={classes.titlePost}
                >
                  <span className={classes.spanTitlePost}>
                    {producto.nombre}
                  </span>
                </Typography>

                {producto.has_subcategoria && (
                  <p>
                    Subcategoria:
                    <strong style={{ marginLeft: "5px" }}>
                      {producto.subcategoria.label}
                    </strong>
                  </p>
                )}

                {producto.tipo !== null && (
                  <p>
                    Tipo:
                    <strong style={{ marginLeft: "5px" }}>
                      {producto.tipo}
                    </strong>
                  </p>
                )}

                <p>
                  <strong>Compra minima</strong>
                  <br />
                  {producto.compra_minima}

                  <span style={{ marginLeft: "5px" }}>
                    {producto.compra_minima === 1
                      ? producto.unidadMedida.nombre_singular
                      : producto.unidadMedida.nombre_plural}
                  </span>
                </p>

                <p className={classes.descripcion}>
                  <strong>Descripcion</strong>
                  <br /> {producto.descripcion}
                </p>

                {producto.mostrar_precio ? (
                  <Typography
                    variant="h5"
                    color="secondary"
                    className={classes.titlePost}
                  >
                    Precio: <strong>{producto.precio} MXN</strong>
                  </Typography>
                ) : (
                  <p className={classes.solicitarCotizacion}>
                    <b>
                      Para solicitar cotizacion, dirijase{" "}
                      <Link href={"/contacto"}>
                        <a
                          style={{
                            color: "green",
                            borderBottom: "1px solid green",
                          }}
                          onClick={() => setOpenBackdrop(true)}
                        >
                          aqui
                        </a>
                      </Link>
                    </b>
                  </p>
                )}
              </Grid>
            </Grid>
          ) : (
            <p>Producto no encontrado</p>
          )}
        </Container>
      </Layout>

      <CircularCoverBackdrop open={openBackdrop} handleClose={handleClose} />
    </>
  );
}

export async function getStaticProps({ params }) {
  const { producto: productoSlug } = params;

  const producto = await getProductoPorSlug(productoSlug);

  return {
    props: {
      producto,
    },
  };
}

export async function getStaticPaths() {
  const productosApi = await getAllProductos();

  const rutas = productosApi.map((el) => `/productos/${el.slug}`);

  return {
    paths: rutas,
    fallback: true,
  };
}
