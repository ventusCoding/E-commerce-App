import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../helpers/utility";

const initialState = {
  products: [],
  loading: false,
  error: null,
  success: "",
};

const fetchProductsStart = (state, action) => {
  return updateObject(state, {
    loading: true,
  });
};

const fetchProductsSuccess = (state, action) => {
  return updateObject(state, {
    products: action.products,
    loading: false,
  });
};

const fetchProductsFail = (state, action) => {
  return updateObject(state, { error: action.error, loading: false });
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PRODUCTS_START:
      return fetchProductsStart(state, action);
    case actionTypes.FETCH_PRODUCTS_SUCCESS:
      return fetchProductsSuccess(state, action);
    case actionTypes.FETCH_PRODUCTS_FAIL:
      return fetchProductsFail(state, action);

    default:
      return state;
  }
};

export default productsReducer;