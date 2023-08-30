import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
// import styles from "./Detail.module.css";

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
      <div>
        <Link to={"/home"}>
          <button>Volver</button>
        </Link>
      </div>
      {imageDetail.map((url) =>
        url ? <img src={url} alt={cardDetail.name} /> : null
      )}

      <p>Nombre: {cardDetail.name}</p>
      {/* <p>Descripcion: {cardDetail.description}</p> */}
      <p>Genero: {cardDetail.gender}</p>
      <p>Categoria: {cardDetail.category}</p>
      <p>Material Principal: {cardDetail.mainMaterial}</p>
      <p>Precio: ${cardDetail.price}</p>
    </div>
  );
}
