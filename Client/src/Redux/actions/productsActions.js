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
      const response = await axios.get("http://localhost:3001/products");
      const products = response.data;
      dispatch({ type: GET_PRODUCTS, payload: products });
      return products;
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
};

export const postProduct = (productData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/products",
        productData
      );
      const createdProduct = response.data;
      dispatch({ type: POST_PRODUCT, payload: createdProduct });
      return createdProduct;
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };
};

export const getSizes = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios("http://localhost:3001/sizes");
      dispatch({ type: GET_SIZES, payload: data });
    } catch (error) {
      console.error(error);
    }
  };
};

export const getGenders = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios("http://localhost:3001/gender");
      dispatch({ type: GET_GENDER, payload: data });
    } catch (error) {
      console.error(error);
    }
  };
};

export const getCategory = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios("http://localhost:3001/category");
      dispatch({ type: GET_CATEGORY, payload: data });
    } catch (error) {
      console.error(error);
    }
  };
};

export const getFilters = (dataFilter) => {
  return async (dispatch) => {
    try {
      // Verifica si todas las propiedades de dataFilter están vacías
      const isDataFilterEmpty = Object.values(dataFilter).every(
        (value) => value === ""
      );

      if (isDataFilterEmpty) {
        // Si todas están vacías, envía un array vacío como payload
        dispatch({ type: FILTER, payload: [] });
        return; // Sal de la función
      }

      const response = await fetch("http://localhost:3001/filter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataFilter),
      });

      const data = await response.json();

      if (response.status === 404) {
        alert(data.message);
      }

      dispatch({ type: FILTER, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const setOrderByName = (order) => {
  return { type: ORDER, payload: order };
};
