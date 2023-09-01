import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./FilterBar.module.css";
import { getFiltes } from "../../Redux/actions/productsActions";

const FilterBar = () => {
  const dispatch = useDispatch();

  const [dataFilter, setDataFilter] = useState({
    category: "",
    size: "",
    gender: "",
  });
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setDataFilter((prevData) => ({ ...prevData, [name]: value }));
    dispatch(getFiltes());
  };

  return (
    <div className={styles.FilterBarContainer}>
      <div className={styles.genderFilter}>
        <a onChange={handleChange}>HOMBRE</a>
        <a>MUJER</a>
        <a>NIÑO</a>
        <a>NIÑA</a>
      </div>

      <div className={styles.selectContainer}>
        <div className={styles.categorySelect}>
          <select onChange={handleChange} name="category" id="">
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
          <select onChange={handleChange} name="category" id="">
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
