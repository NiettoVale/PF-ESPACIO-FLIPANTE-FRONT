import {
  GET_PRODUCTS, GET_PRODUCTSBYNAME,
} from "../actions/actionTypes";

const initialState = {
  products: [],
  productsByname: [],
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
      default:
          return state;
  }
};

export default productsReducer;
