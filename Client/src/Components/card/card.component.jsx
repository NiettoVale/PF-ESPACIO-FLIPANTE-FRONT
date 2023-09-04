import React from "react";
import { Link } from "react-router-dom";
import styles from "./card.module.css";
import { useSelector } from "react-redux";

const Card = ({ name, images, price, category, id }) => {
  // Supongamos que userInfo tiene una propiedad "favorites" que es un array de IDs de productos favoritos.
  const userInfo = useSelector((state) => state.userInfo);

  const handleFavorite = async (userId, productId) => {
    try {
      const response = await fetch(
        `https://espacioflipante.onrender.com/users/${userId}/products/${productId}/favorite`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al agregar a favoritos"); // Puedes personalizar el mensaje de error aquí
      }

      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error(error);
      alert("Ocurrió un error al agregar a favoritos"); // Mensaje de error genérico en caso de fallo
    }
  };

  return (
    <div>
      <Link to={`/detail/${id}`}>
        <div className={styles.cardContainer}>
          <p className={styles.hoverMessage}>VER DETALLES</p>

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
      </Link>
      {/* Botón de favoritos */}
      {userInfo && userInfo.name ? (
        <button
          className={styles.favoriteButton}
          onClick={() => {
            handleFavorite(userInfo.id, id);
          }}
        >
          Añadir a favoritos
        </button>
      ) : null}
    </div>
  );
};

export default Card;
