import {
  Container,
  Grid,
  makeStyles,
  Typography,
  Backdrop,
  CircularProgress,
  Button,
} from "@material-ui/core";
import { Layout } from "../../components/Layout";

import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import { blogApi } from "../../utils/contentfulApi";
import Link from "next/link";
import { CircularCoverBackdrop } from "../../components/Helpers/CircularCoverBackdrop";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: "70vh",
    marginBottom: "50px",
    marginTop: "60px",
  },
  titleBlog: {
    marginTop: "40px",
    marginBottom: "70px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "2rem",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.5rem",
    },
  },
  spanBlog: {
    borderBottom: "2px solid #56C62C",
  },
  heroImage: {
    width: "70%",
    maxHeight: 500,
    [theme.breakpoints.down("sm")]: {
      width: "95%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  containerMetaData: {
    marginTop: 30,
    marginBottom: 50,
    textAlign: "center",
  },
  embeddedImg: {
    width: "65%",
    height: "320px",
    [theme.breakpoints.down("sm")]: {
      width: "95%",
      height: "250px",
    },
    [theme.breakpoints.down("xs")]: {
      height: "210px",
    },
  },
  documentToReactComponents: {
    margin: "0 auto",
    width: "80%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  btnVolver: {
    marginBottom: "30px",
    marginTop: "40px",
  },
}));

const EmbeddedImg = (props) => {
  const classes = useStyles();

  return <img className={classes.embeddedImg} src={props.src} />;
};

const options = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const { file } = node.data.target.fields;
      const { contentType } = node.data.target.fields.file;
      // application/pdf
      // image/jpeg

      switch (contentType) {
        case "application/pdf":
          return (
            <div>
              <p>
                Descarga el archivo <b> {file.fileName} </b>
                <a href={file.url} target="_blank" style={{ color: "green" }}>
                  <PictureAsPdfIcon></PictureAsPdfIcon>
                </a>
              </p>
            </div>
          );
        case "image/jpeg":
          return (
            node.data.target.fields.file !== undefined && (
              <EmbeddedImg src={node.data.target.fields.file.url} />
            )
          );
          break;
        default:
          return <p></p>;
          break;
      }
    },
    [BLOCKS.UL_LIST]: (node, children) => {
      return <ul style={{ textAlign: "left" }}>{children}</ul>;
    },
    [BLOCKS.LIST_ITEM]: (node, children) => {
      const UnTaggedChildren = documentToReactComponents(node, {
        renderNode: {
          [BLOCKS.PARAGRAPH]: (node, children) => children,
          [BLOCKS.LIST_ITEM]: (node, children) => children,
        },
      });

      return <li>{UnTaggedChildren}</li>;
    },
  },
};

export default function BlogpostPage({ blogpost }) {
  const classes = useStyles();
  const [openBackdrop, setOpenBackdrop] = React.useState(false); // backdrop

  const handleClose = () => {
    setOpenBackdrop(false);
  };

  return (
    <Layout>
      <Container className={classes.container}>
        {blogpost ? (
          <>
            <Typography
              variant="h4"
              color="secondary"
              className={classes.titleBlog}
            >
              <span className={classes.spanBlog}>{blogpost.titulo}</span>
            </Typography>
            <img
              className={classes.heroImage}
              src={blogpost.imagenPrincipal.imageUrl}
            />
            <div className={classes.containerMetaData}>
              <p>
                Fecha de publicacion: <b>{blogpost.fechaPublicacion}</b>
              </p>
              <p>
                Autor: <b>{blogpost.autor.name}</b>
              </p>
            </div>
            <div className={classes.documentToReactComponents}>
              {documentToReactComponents(blogpost.informacion, options)}
            </div>
          </>
        ) : (
          <p>Blog no encontrado</p>
        )}

        <Link href="/blog">
          <Button
            variant="outlined"
            color="primary"
            className={classes.btnVolver}
            onClick={() => setOpenBackdrop(true)}
          >
            Volver a los blogposts
          </Button>
        </Link>
      </Container>

      <CircularCoverBackdrop open={openBackdrop} handleClose={handleClose} />
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const api = new blogApi();
  const blogpost = await api.fetchBlogpostBySlug(params.blogpost);

  return {
    props: {
      blogpost,
    },
  };
}

export async function getStaticPaths() {
  const api = new blogApi();

  const slugs = await api.fetchBlogSlugs();
  const rutas = slugs.map((slug) => `/blog/${slug}`);

  return {
    paths: rutas,
    fallback: true,
  };
}
