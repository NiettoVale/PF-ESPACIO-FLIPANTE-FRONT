import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../Redux/actions/productsActions";
import Cards from "../../Components/cards/cards.component";
import Hero from "../../Components/Hero/Hero";

import styles from "./home.module.css";

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  return (
    <div>
      <Hero />
      <div className={styles.catalogueSection}>
        <h2>Catalogo</h2>
        <p className={styles.catalogueSectionP}>ropa flipante</p>
        <div className={styles.cardsContainer}>
          <Cards products={products} />
        </div>
      </div>
    </div>
  );
};

export default Home;
