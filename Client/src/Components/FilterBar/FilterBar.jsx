import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ImMenu } from "react-icons/im";
import { AiFillCloseCircle } from "react-icons/ai";

import styles from "./FilterBar.module.css";
import {
  getFilters,
  getSizes,
  setOrderByName,
} from "../../Redux/actions/productsActions";

const initialState = {
  category: "",
  size: "",
  gender: "",
};

const FilterBar = () => {
  const dispatch = useDispatch();
  const [dataFilter, setDataFilter] = useState(initialState);
  const sizes = useSelector((state) => state.sizes);

  const handleGenderChange = (event) => {
    const { name, value } = event.target;
    setDataFilter((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCategoryChange = (event) => {
    const { name, value } = event.target;
    setDataFilter((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSizes = (event) => {
    const { name, value } = event.target;
    setDataFilter((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleClearFilters = () => {
    setDataFilter(initialState);
  };

  const handleSortChange = (event) => {
    const selectedOrder = event.target.value;
    if (selectedOrder === "") {
      dispatch(setOrderByName(null)); // Usar null para indicar que no se aplique orden
    } else {
      dispatch(setOrderByName(selectedOrder));
    }
  };

  useEffect(() => {
    dispatch(getFilters(dataFilter));
    dispatch(getSizes());
  }, [dataFilter, dispatch]);

  const [filtersBar, setFiltersBar] = useState(false);
  const handleClick = () => setFiltersBar(!filtersBar);
  // const handleClose = () => setFiltersBar(!filtersBar);

  return (
    <div className={!filtersBar ? styles.hidden : styles.shown}>
      <div className={styles.stickyButton}>
        <div onClick={handleClick}>
          {!filtersBar ? (
            <a className={styles.openButton}>FILTROS </a>
          ) : (
            <a className={styles.openButton}>CERRAR </a>
          )}
        </div>
      </div>

      <div className={styles.FilterBarContainer}>
        <div className={styles.selectContainer}>
          <div className={styles.genderFilter}>
            <select
              onChange={handleGenderChange}
              name="gender"
              id="genderSelect"
              value={dataFilter.gender}
            >
              <option value="" disabled>
                Seleccionar género
              </option>
              <option value="HOMBRE">HOMBRE</option>
              <option value="MUJER">MUJER</option>
              <option value="NENE">NENE</option>
              <option value="NENA">NENA</option>
            </select>
          </div>

          <div className={styles.categorySelect}>
            <select
              onChange={handleCategoryChange}
              name="category"
              id="categorySelect"
              value={dataFilter.category}
            >
              <option value="" disabled>
                Seleccionar categoria
              </option>
              <option value="Campera">Campera</option>
              <option value="Buzo">Buzo</option>
              <option value="Remera">Remera</option>
              <option value="Pantalón">Pantalón</option>
              <option value="Vestido">Vestido</option>
              <option value="Accesorio">Accesorio</option>
            </select>
          </div>

          <div className={styles.orderSelect}>
            <select
              id="Alphabetical"
              onChange={handleSortChange}
              value={dataFilter.order}
            >
              <option value="" disabled>
                Seleccionar orden
              </option>
              <option value="asc">A-Z</option>
              <option value="desc">Z-A</option>
            </select>
          </div>

          <div className={styles.sizesSelect}>
            <select name="sizes" value={dataFilter.size} onChange={handleSizes}>
              <option value="">Seleccionar talless</option>
              {sizes.map((size, index) => (
                <option key={index} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          <button className={styles.cleanButton} onClick={handleClearFilters}>
            Limpiar filtros
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
