import {
  GET_PRODUCTS,
  GET_SIZES,
  POST_PRODUCT,
  FILTER,
  GET_CATEGORY,
  GET_GENDER,
  SET_USER,
  ORDER,
  GET_FAVORITES,
  LOG_OUT,
} from "../actions/actionTypes";

const initialState = {
  products: [],
  productsFiltered: [],
  sizes: [],
  genders: [],
  category: [],
  myFavorites: [],
  userInfo: [],
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

    case GET_FAVORITES:
      return {
        ...state,
        myFavorites: action.payload,
      };

    case SET_USER:
      return {
        ...state,
        userInfo: action.payload,
      };

    case GET_GENDER:
      return {
        ...state,
        genders: action.payload,
      };

    case GET_SIZES:
      return {
        ...state,
        sizes: action.payload,
      };

    case POST_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload],
      };

    case ORDER:
      return {
        ...state,
        order: action.payload,
      };

    case FILTER:
      return {
        ...state,
        productsFiltered: action.payload,
      };

    case LOG_OUT:
      return {
        ...state,
        userInfo: [],
      };

    default:
      return state;
  }
};

export default rootReducer;
