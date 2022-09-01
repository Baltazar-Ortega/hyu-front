import React from "react";
// Material UI Components
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { Hidden } from "@material-ui/core";
// Material UI Helperes
import theme from "../../src/theme";
// Nextjs components
import Link from "next/link";


const useStyles = makeStyles({
  logoImg: {
    height: "120px",
    width: "80%",
    marginTop: '10px',
    marginBottom: '10px',
    maxWidth: "400px",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      justifyContent: "start",
      width: "80%",
      maxWidth: "340px",
      height: "100px",
    },

    [theme.breakpoints.down("xs")]: {
      display: "flex",
      justifyContent: "start",
      width: "65%",
      maxWidth: "300px",
      height: "80px",
    },
  },
});

export const HeaderLogo = () => {
  const classes = useStyles();

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Link href="/">
          <a>
            <img
              src="/images/logo_horizontal.jpg"
              className={classes.logoImg}
            />
          </a>
        </Link>
      </Box>

      <Hidden mdUp>
        <hr />
      </Hidden>
    </Container>
  );
};
