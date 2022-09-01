import React from "react";
import { slide as Menu } from "react-burger-menu";
import Link from "next/link";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  spanLink: {
    display: "block"
  }
}))

export const SideBar = () => {

  const classes = useStyles()

  return (
    <Menu right>
      <span className="bm-item menu-item" href="#" className={classes.spanLink}>
        <Link href="/productos">
          <a>Productos</a>
        </Link>
      </span>

      <span className="bm-item menu-item" href="#" className={classes.spanLink}>
        <Link href="/ofertas">
          <a>Ofertas</a>
        </Link>
      </span>

      <span className="bm-item menu-item" href="#" className={classes.spanLink}>
        <Link href="/acerca-de">
          <a>Acerca de nosotros</a>
        </Link>
      </span>

      <span className="bm-item menu-item" href="#" className={classes.spanLink}>
        <Link href="/blog">
          <a>Blog</a>
        </Link>
      </span>

      <span className="bm-item menu-item" href="#" className={classes.spanLink}>
        <Link href="/contacto">
          <a>Contacto</a>
        </Link>
      </span>
    </Menu>
  );
};
