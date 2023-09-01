// import React from "react";

// export default function SearchBar({ busqueda, setBusqueda, filterSearch }) {
//   const handleChange = (event) => {
//     setBusqueda(event.target.value);
//     filterSearch(event.target.value);
//   };

//   return (
//     <div>
//       <input type="search" value={busqueda} onChange={handleChange} />
//       <a>ACCESO</a>
//       <a>CARRITO</a>
//     </div>
//   );
// }

import React from "react";
import styles from "./SearchBar.module.css";

export default function SearchBar({ busqueda, setBusqueda, filterSearch }) {
  const handleChange = (event) => {
    setBusqueda(event.target.value);
    filterSearch(event.target.value);
  };

  return (
    <div className={styles.searchBarContainer}>
      <input
        type="search"
        value={busqueda}
        onChange={handleChange}
        className={styles.searchInput}
      />
      <div className={styles.flexSpace}></div>
      <a className={styles.link}>ACCESO</a>
      <a className={styles.link}>CARRITO</a>
    </div>
  );
}
