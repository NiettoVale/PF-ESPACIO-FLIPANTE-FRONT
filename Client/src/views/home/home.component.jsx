import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../Redux/actions/productsActions";
import Cards from "../../Components/cards/cards.component";
import Hero from "../../Components/Hero/Hero";
import SearchBar from "../../Components/SearchBar/SearchBar";
import FilterBar from "../../Components/FilterBar/FilterBar";

import styles from "./home.module.css";
import Footer from "../../Components/Footer/Footer";

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const [busqueda, setBusqueda] = useState("");
  const [productsByName, setProductsByName] = useState([]);

  const filterSearch = useCallback(
    (searchTerm) => {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(lowerCaseSearchTerm)
      );
      setProductsByName(filteredProducts);
    },
    [products]
  );

  useEffect(() => {
    if (busqueda === "" || busqueda === null) {
      dispatch(getProducts());
    } else {
      filterSearch(busqueda);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [busqueda, dispatch]);

  return (
    <div>
      <Hero />

      <h1>ESPACIO FLIPANTE</h1>
      <FilterBar />
      <SearchBar
        busqueda={busqueda}
        setBusqueda={setBusqueda}
        filterSearch={filterSearch}
      />
      <div className="cards-container">
        {busqueda === "" || productsByName.length > 0 ? (
          <Cards products={busqueda === "" ? products : productsByName} />
        ) : (
          <p>No se encontraron productos.</p>
        )}
      </div>
      <div className={styles.catalogueSection}>
        <h2>Catalogo</h2>
        <p className={styles.catalogueSectionP}>ropa flipante</p>
        <div className={styles.cardsContainer}>
          <Cards products={products} />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
