import PropTypes from "prop-types";
import Card from "../card/card.component";
import styles from "./cards.module.css";


const Cards = ({ products }) => {
  
  return (
    <div className={styles.contenedorCards}>
      {products.map((product) => (
        <Card
          key={product.id}
          id={product.id}
          name={product.name}
          gender={product.gender}
          category={product.category}
          mainMaterial={product.mainMaterial}
          images={product.images}
          price={product.price}
        />
      ))}
    </div>
  );
};

Cards.propTypes = {
  products: PropTypes.array.isRequired, // Indica que 'products' debe ser un array y es requerido.
};

export default Cards;
