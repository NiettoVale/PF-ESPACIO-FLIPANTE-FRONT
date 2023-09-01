import {
  GET_PRODUCTS,
  GET_SIZES,
  POST_PRODUCT,
  FILTER,
  GET_CATEGORY,
  GET_GENDER,
  ORDER,
} from "../actions/actionTypes";

const initialState = {
  products: [],
  productsFiltered: [],
  sizes: [],
  genders: [],
  category: [],
  order: "asc",
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case GET_CATEGORY:
      return {
        ...state,
        category: action.payload,
      };

    case GET_GENDER:
      return {
        ...state,
        genders: action.payload,
      };

    case FILTER:
      return {
        ...state,
        productsFiltered: action.payload,
      };

    case POST_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload],
      };

    case GET_SIZES:
      return {
        ...state,
        sizes: action.payload,
      };

    case ORDER:
      return {
        ...state,
        order: action.payload,
      };

    default:
      return state;
  }
};

export default rootReducer;
