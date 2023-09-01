import {
  GET_PRODUCTS, GET_PRODUCTSBYNAME, GET_SIZES, POST_PRODUCT, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT 
} from "../actions/actionTypes";

const initialState = {
  products: [],
  productsByname: [],
  sizes: [],
  user: null,
  error: null,
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
        };
        case LOGIN_SUCCESS:
          return {
            ...state,
            user: action.payload,
            error: null,
          };
        case LOGIN_ERROR:
          return {
            ...state,
            user: null,
            error: action.payload,
          };
        case LOGOUT:
          return {
            ...state,
            user: null,
            error: null,
          };  
      default:
          return state;
  }
};

export default productsReducer;
