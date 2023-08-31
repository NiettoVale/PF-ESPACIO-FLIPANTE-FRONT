import axios from "axios";
import { GET_PRODUCTS, GET_PRODUCTSBYNAME } from "./actionTypes";

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

export const getProductsByName = (name) => {
  return async (dispatch) => {
    try {
      console.log(name);
      const productsByName = await axios.get(
        `http://localhost:3001/filter?name=${name}`
      );
      console.log(productsByName);
      dispatch({ type: GET_PRODUCTSBYNAME, payload: productsByName });
      return productsByName;
    } catch (error) {
      return error;
    }
  };
};
