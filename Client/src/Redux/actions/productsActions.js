import axios from "axios";
import { GET_PRODUCTS, GET_PRODUCTSBYNAME, POST_PRODUCT, GET_SIZES } from "./actionTypes";

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

export const postProduct = (productData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("http://localhost:3001/products", productData);
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
      console.log(data, "soy data")
      dispatch({ type: GET_SIZES, payload: data})
    } catch (error) {
      console.error(error);
    }
  }
}
