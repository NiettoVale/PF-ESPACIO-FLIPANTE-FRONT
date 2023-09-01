import React from "react";
import styles from "./NavBar.module.css";

const NavBar = () => {
  return (
    <div className={styles.navBar}>
      <div className={styles.genderNav}>
        <a>ADULTOS</a>
        <a>NIÑOS</a>
        <a>HENRY SALE</a>
        <a>CONTACTO</a>
      </div>
    </div>
  );
};

export default NavBar;
