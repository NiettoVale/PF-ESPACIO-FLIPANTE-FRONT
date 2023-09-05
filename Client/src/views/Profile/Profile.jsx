import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getFavorites, setUser } from "../../Redux/actions/productsActions";
import Cards from "../../Components/cards/cards.component";

const Profile = () => {
  const dispatch = useDispatch();

  const location = useLocation();
  const userInfo = location.state?.userInfo;
  const user = useSelector((state) => state.userInfo);
  const favorites = useSelector((state) => state.myFavorites);

  // Almacenar userInfo en localStorage cuando esté disponible
  useEffect(() => {
    if (userInfo !== undefined) {
      dispatch(setUser(userInfo));
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
    }
  }, [dispatch, userInfo]);

  // Recuperar userInfo desde localStorage en la carga inicial
  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    if (storedUserInfo) {
      const parsedUserInfo = JSON.parse(storedUserInfo);
      dispatch(setUser(parsedUserInfo));
    }
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(getFavorites(user.id));
    }
  }, [dispatch, user]);

  return (
    <div>
      <Link to={"/"}>
        <button>Inicio</button>
      </Link>
      <h1>Bienvenido {user.name}!!!</h1>

      {Object.keys(user).map((key) => {
        const value = user[key];
        if (
          key !== "password" &&
          key !== "eliminado" &&
          value &&
          key !== "id"
        ) {
          return (
            <p key={key}>
              {key}: {value}
            </p>
          );
        }
        return null; // Excluir propiedades vacías del mapeo
      })}

      <h2>Productos Favoritos:</h2>
      <Cards products={favorites} />
    </div>
  );
};

export default Profile;
