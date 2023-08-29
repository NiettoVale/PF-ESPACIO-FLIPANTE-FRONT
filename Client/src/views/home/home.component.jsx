import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../../Redux/actions/productsActions';
import Cards from '../../Components/cards/cards.component';

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  return (
    <div>
      <h1>ESPACIO FLIPANTE</h1>
      <div className="cards-container">
        <Cards products={products}/>
      </div>
    </div>
  );
};

export default Home;
