import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../Redux/actions/productsActions";
import Cards from "../../Components/cards/cards.component";
import Hero from "../../Components/Hero/Hero";

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  return (
    <div>
      <Hero />
      <h1>ESPACIO FLIPANTE</h1>
      <div className="cards-container">
        <Cards products={products} />
      </div>
    </div>
  );
};

export default Home;
