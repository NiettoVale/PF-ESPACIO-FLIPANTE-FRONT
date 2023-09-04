import axios from "axios";
import {
  GET_PRODUCTS,
  POST_PRODUCT,
  GET_SIZES,
  FILTER,
  GET_CATEGORY,
  GET_GENDER,
  ORDER,
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

export const setOrderByName = (order) => {
  return { type: ORDER, payload: order };
};
