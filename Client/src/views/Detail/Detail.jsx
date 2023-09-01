// PULL

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./Detail.module.css";

export default function Detail() {
  const { id } = useParams();
  const [cardDetail, setCardDetail] = useState({});
  const [imageDetail, setImageDetail] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/detail/${id}`);
        console.log(response);
        if (!response.ok) {
          throw new Error("Error al obtener los productos");
        }

        const data = await response.json();
        console.log(data, "soy la data");
        if (data.name) {
          setCardDetail(data);
          setImageDetail(data.images);
        } else {
          window.alert("No hay productos con ese ID");
        }
      } catch (error) {
        alert(error.message);
      }
    };

    fetchData();
  }, [id]);

  console.log(imageDetail);
  return (
    <div>
      <Link to={"/home"}>
        <button className={styles.backButton}>⬅</button>
      </Link>

      <div className={styles.detailContainer}>
        <div className={styles.imgContainer}>
          {imageDetail.map((url, index) =>
            url ? (
              <img
                src={url}
                alt={cardDetail.name}
                className={index === 0 ? styles.mainImage : styles.thumbnail}
              />
            ) : null
          )}
        </div>

        <div className={styles.detailInfo}>
          <p className={styles.detailName}>{cardDetail.name}</p>

          <div className={styles.sizesButtons}>
            <button>S</button>
            <button>M</button>
            <button>L</button>
            <button>XL</button>
            <button>XXL</button>
          </div>

          <div>
            <p className={styles.detailDescription}>{cardDetail.description}</p>
            <p className={styles.detailGender}>Genero: {cardDetail.gender}</p>
            <p className={styles.detailCategory}>
              Categoria: {cardDetail.category}
            </p>
            <p className={styles.detailMaterial}>
              Material Principal: {cardDetail.mainMaterial}
            </p>
          </div>

          <p className={styles.detailPrice}>${cardDetail.price}</p>

          <div className={styles.detailButtons}>
            <button className={styles.favButton}>AGREGAR A FAVORITOS</button>
            <button className={styles.cartButton}>AGREGAR AL CARRITO</button>
          </div>
        </div>
      </div>
    </div>
  );
}
