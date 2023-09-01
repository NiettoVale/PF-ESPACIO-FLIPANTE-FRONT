import React from "react";
import styles from "./NavBar.module.css";

const NavBar = () => {
  return (
    <div className={styles.navContainer}>
      <div className={styles.navBar}>
        <div className={styles.genderNav}>
          <a>CATALOGO</a>
          <a>OFERTAS</a>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
