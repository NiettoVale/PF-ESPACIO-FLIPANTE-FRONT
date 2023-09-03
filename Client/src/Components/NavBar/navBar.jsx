import React from "react";
import styles from "./NavBar.module.css";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className={styles.navContainer}>
      <div className={styles.navBar}>
        <Link to={"/home"}>
          <a>INICIO</a>
        </Link>
        <a>CATALOGO</a>
        <a>OFERTAS</a>
      </div>

      <div>
             
        <a className={styles.link}>ACCESO</a>
      
        <a className={styles.link}>CARRITO</a>
      </div>
    </div>
  );
};

export default NavBar;
