import {Link} from "react-router-dom"
import styles from "./card.module.css";

const Card = ({ name, images, price, id }) => {
  return (
    <div className={styles.cardContainer}>
      {/* Mostrar la imagen */}
      {images ? (
        <img src={images[0]} alt={name} className={styles.imgCard} />
      ) : (
        <img
          src="https://media.tenor.com/wpSo-8CrXqUAAAAi/loading-loading-forever.gif"
          alt="Cargando..."
        />
      )}

      {/* Información relevante */}
      <p>Nombre: {name}</p>
      <p>Precio: ${price}</p>

      <div>
        <Link to={`/detail/${id}`}>
          <button>Detalle</button>
        </Link>
      </div>
    </div>
  );
};

export default Card;
