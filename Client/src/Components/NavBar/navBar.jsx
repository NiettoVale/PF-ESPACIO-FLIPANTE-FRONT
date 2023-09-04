import React from "react";
import styles from "./NavBar.module.css";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className={styles.navContainer}>
      <div className={styles.navBar}>
        <Link to={"/"} className={styles.link}>
          INICIO
        </Link>
        <Link to={"/"} className={styles.link}>
          CATALOGO
        </Link>
        <Link to={"/"} className={styles.link}>
          OFERTAS
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
