import React, { useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { Layout } from "../../components/Layout";
import { Container, makeStyles, Typography } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { withIronSession } from "next-iron-session";

const useStyles = makeStyles((theme) => ({
  titlePost: {
    marginTop: "20px",
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
  passwordInputContainer: {
    marginBottom: "30px",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const AdminStartPage = () => {
  const classes = useStyles();
  const router = useRouter();
  const passwordInput = useRef();

  const [openError, setOpenError] = React.useState(false);
  const [openLoader, setOpenLoader] = React.useState(false);

  const handleClickOpen = () => {
    setOpenError(true);
  };

  const handleClose = () => {
    setOpenError(false);
  };

  useEffect(() => {
    passwordInput.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const password = passwordInput.current.value;
    // console.log("password introducida", password)

    const response = await fetch("/api/sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }), // convertir javascript object a JSON
    });

    // console.log("Response", response)

    if (response.ok) {
      setOpenLoader(true);
      return router.push("/admin/menu");
    } else {
      setOpenError(true);
      passwordInput.current.value = "";
    }
  };

  return (
    <Layout>
      <Container style={{ marginTop: "30px", minHeight: "70vh" }}>
        <Typography
          variant="h4"
          color="secondary"
          className={classes.titlePost}
        >
          <span className={classes.spanTitlePost}>
            Entrar como administrador
          </span>
        </Typography>

        <form onSubmit={handleSubmit}>
          <div className={classes.passwordInputContainer}>
            <label>
              Contraseña: <input type="password" ref={passwordInput} />
            </label>
          </div>
          <div>
            <Button variant="outlined" color="primary" type="submit">
              Entrar
            </Button>
          </div>
        </form>
      </Container>

      <Backdrop
        className={classes.backdrop}
        open={openLoader}
        onClick={() => setOpenLoader(false)}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Dialog
        open={openError}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Error en el inicio de sesion
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Contraseña incorrecta
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export const getServerSideProps = withIronSession(
  async ({ req, res }) => {
    const user = req.session.get("user");

    // Ya está logueado
    if (user) {
      res.setHeader("location", "/admin/menu");
      res.statusCode = 302;
      res.end();
      return { props: {} };
    }

    return {
      props: { },
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

export default AdminStartPage;
