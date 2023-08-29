import axios from "axios";
import {
    GET_PRODUCTS,
} from "./actionTypes";

export const getProducts = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get("http://localhost:3001/prendas");
            const products = response.data;
            dispatch ({ type: GET_PRODUCTS, payload: products });
            return products;
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    }; 
};