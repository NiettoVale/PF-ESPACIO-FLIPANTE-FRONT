import React from "react";
import styles from "./NavBar.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../Redux/actions/productsActions";

const NavBar = () => {
  const userInfo = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(logOut());
  };

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

        {userInfo && userInfo.name ? (
          <div className={styles.divUserContainer}>
            <Link to={"/profile"}>
              <img src="https://acortar.link/ny88Fm" alt="" />
            </Link>
            <Link to={"/profile"}>
              <h3>{userInfo.name}</h3>
            </Link>

            <img
              src="https://acortar.link/stkkZX"
              alt="logout"
              onClick={logout}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default NavBar;
