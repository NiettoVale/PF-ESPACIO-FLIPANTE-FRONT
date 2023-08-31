import React from "react";
import styles from "./FilterBar.module.css";

const FilterBar = () => {
  return (
    <div className={styles.FilterBarContainer}>
      <div className={styles.genderFilter}>
        <a>HOMBRE</a>
        <a>MUJER</a>
        <a>NIÑO</a>
        <a>NIÑA</a>
      </div>

      <div className={styles.selectContainer}>
        <div className={styles.categorySelect}>
          <select name="category" id="">
            <option value="Todos">sin filtrar</option>
            <option value="Campera">Campera</option>
            <option value="Buzo">Buzo</option>
            <option value="Remera">Remera</option>
            <option value="Pantalon">Pantalon</option>
            <option value="Vestido">Vestido</option>
            <option value="Accesorio">Accesorio</option>
          </select>
        </div>
        <div className={styles.orderSelect}>
          <select name="category" id="">
            <option value="AtoZ">A - Z</option>
            <option value="ZtoA">Z - A</option>
            <option value="Mayor">MAYOR PRECIO</option>
            <option value="Menor">MENOR PRECIO</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
