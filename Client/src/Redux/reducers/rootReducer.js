import {
  GET_PRODUCTS, GET_PRODUCTSBYNAME, GET_SIZES, POST_PRODUCT
} from "../actions/actionTypes";

const initialState = {
  products: [],
  productsByname: [],
  sizes: []
}

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
      case GET_PRODUCTS:
          return {
              ...state,
              products: action.payload
          };
      case GET_PRODUCTSBYNAME:
        return {
          ...state,
          productsByname: action.payload
        }
      case POST_PRODUCT:
        return {
            ...state,
            products: [...state.products, action.payload]
          };
      case GET_SIZES:
        console.log("este es el reducer", state.sizes)
        return {
          ...state,
          sizes: action.payload
        }
      default:
          return state;
  }
};

export default productsReducer;
