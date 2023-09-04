import axios from "axios";
import {
  GET_PRODUCTS,
  GET_SIZES,
  GET_CATEGORY,
  GET_GENDER,
  GET_FAVORITES,
  POST_PRODUCT,
  FILTER,
  ORDER,
  SET_USER,
  LOG_OUT,
  POST_FAVORITE,
} from "./actionTypes";

export const getProducts = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        "https://espacioflipante.onrender.com/products"
      );
      const products = response.data;

      dispatch({ type: GET_PRODUCTS, payload: products });

      return products;
    } catch (error) {
      alert("Algo salió mal!!!");
      console.error("Error fetching products:", error);
    }
  };
};

export const getFavorites = (id) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `https://espacioflipante.onrender.com/favorites/${id}`
      );

      if (!response.ok) {
        throw new Error("Error en la solicitud");
      }

      const data = await response.json();

      dispatch({ type: GET_FAVORITES, payload: data.favorites });
    } catch (error) {
      alert("Algo salió mal!!!");
      console.log(error);
    }
  };
};

export const setUser = (userData) => {
  return async (dispatch) => {
    try {
      dispatch({ type: SET_USER, payload: userData });
    } catch (error) {
      alert("Algo salió mal!!!");
      console.log(error);
    }
  };
};

export const logOut = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOG_OUT });
    } catch (error) {
      alert("Algo salió mal!!!");
      console.log(error);
    }
  };
};

export const getSizes = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios(
        "https://espacioflipante.onrender.com/sizes"
      );

      dispatch({ type: GET_SIZES, payload: data });
    } catch (error) {
      alert("Algo salió mal!!!");
      console.error(error);
    }
  };
};

export const getGenders = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios(
        "https://espacioflipante.onrender.com/gender"
      );

      dispatch({ type: GET_GENDER, payload: data });
    } catch (error) {
      alert("Algo salió mal!!!");
      console.error(error);
    }
  };
};

export const getCategory = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios(
        "https://espacioflipante.onrender.com/category"
      );

      dispatch({ type: GET_CATEGORY, payload: data });
    } catch (error) {
      alert("Algo salió mal!!!");
      console.error(error);
    }
  };
};

export const getFilters = (dataFilter) => {
  return async (dispatch) => {
    try {
      const isDataFilterEmpty = Object.values(dataFilter).every(
        (value) => value === ""
      );

      if (isDataFilterEmpty) {
        dispatch({ type: FILTER, payload: [] });
        return;
      }

      const response = await fetch(
        "https://espacioflipante.onrender.com/filter",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataFilter),
        }
      );

      const data = await response.json();

      if (response.status === 404) {
        alert(data.message);
      }

      dispatch({ type: FILTER, payload: data });
    } catch (error) {
      alert("Algo salió mal!!!");
      console.log(error);
    }
  };
};

export const postProduct = (productData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "https://espacioflipante.onrender.com/products",
        productData
      );
      const createdProduct = response.data;

      dispatch({ type: POST_PRODUCT, payload: createdProduct });

      return createdProduct;
    } catch (error) {
      alert("Algo salió mal!!!");
      console.error("Error creating product:", error);
    }
  };
};

export const favorite = async (userId, productId) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `https://espacioflipante.onrender.com/user/${userId}/products/${productId}/favorite`
      );
      const favoriteProduct = response.data;

      dispatch({ type: POST_FAVORITE, payload: favoriteProduct });
    } catch (error) {
      alert("Algo salió mal!!!");
      console.error("Error creating product:", error);
    }
  };
};

export const setOrderByName = (order) => {
  return { type: ORDER, payload: order };
};
