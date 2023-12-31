import React from "react";
import { Link } from "react-router-dom";
import styles from "./card.module.css";

const Card = ({ name, images, price, category, id }) => {


  return (


    <div className={styles.cardContainer}>
      <Link to={`/detail/${id}`}>
        <p className={styles.hoverMessage}>VER DETALLES</p>
      </Link>
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
      <div className={styles.cardInfo}>
        <p className={styles.cardName}>{name}</p>
        <p className={styles.cardCategory}>{category}</p>
        <p className={styles.cardPrice}>${price}</p>
      </div>
    </div>
  );
};

export default Card;
