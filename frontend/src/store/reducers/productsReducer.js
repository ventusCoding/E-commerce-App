import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../helpers/utility";


//************** Initial State ********************/

const initialState = {
  products: [],
  loading: false,
  error: null,
  product:{},
};

//************** FETCH PRODUCT BY ID ********************/

const fetchProductDetailStart = (state, action) => {
  return updateObject(state, {
    loading: true,
  });
};

const fetchProductDetailSuccess = (state, action) => {
  return updateObject(state, {
    product: action.product,
    loading: false,
  });
};

const fetchProductDetailFail = (state, action) => {
  return updateObject(state, { error: action.error, loading: false });
};

//************** FETCH PRODUCTS ********************/

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

//************** PRODUCTS REDUCER ********************/

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PRODUCTS_START:
      return fetchProductsStart(state, action);
    case actionTypes.FETCH_PRODUCTS_SUCCESS:
      return fetchProductsSuccess(state, action);
    case actionTypes.FETCH_PRODUCTS_FAIL:
      return fetchProductsFail(state, action);

    case actionTypes.FETCH_PRODUCT_DETAIL_START:
      return fetchProductDetailStart(state, action);
    case actionTypes.FETCH_PRODUCT_DETAIL_SUCCESS:
      return fetchProductDetailSuccess(state, action);
    case actionTypes.FETCH_PRODUCT_DETAIL_FAIL:
      return fetchProductDetailFail(state, action);

    default:
      return state;
  }
};

export default productsReducer;
