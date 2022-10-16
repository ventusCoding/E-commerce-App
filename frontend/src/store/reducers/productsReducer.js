import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../helpers/utility";

//************** Initial State ********************/

const initialState = {
  products: [],
  loading: false,
  error: null,
  product: {},
  message: null,
  success: false,
  pages: 0,
};

//************** CREATE PRODUCT ********************/

const createProductStart = (state, action) => {
  return updateObject(state, {
    message: null,
    loading: true,
    success: false,
  });
};

const createProductSuccess = (state, action) => {
  return updateObject(state, {
    message: "Product created successfully",
    error: null,
    success: true,
  });
};

const createProductFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    message: null,
    success: false,
  });
};

//************** UPDATE PRODUCT ********************/

const updateProductStart = (state, action) => {
  return updateObject(state, {
    message: null,
    loading: true,
    success: false,
  });
};

const updateProductSuccess = (state, action) => {
  return updateObject(state, {
    message: "Product updated successfully",
    loading: false,
    success: true,
  });
};

const updateProductFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    message: null,
    success: false,
  });
};

//************** DELETE PRODUCT ********************/

const deleteProductStart = (state, action) => {
  return updateObject(state, {
    message: null,
    loading: true,
    success: false,
  });
};

const deleteProductSuccess = (state, action) => {
  return updateObject(state, {
    message: "Product deleted successfully",
    success: true,
  });
};

const deleteProductFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    message: null,
    success: false,
  });
};

//************** FETCH PRODUCT BY ID ********************/

const fetchProductDetailStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    error: null,
    success: false,
  });
};

const fetchProductDetailSuccess = (state, action) => {
  return updateObject(state, {
    product: action.product,
    loading: false,
    success: false,
  });
};

const fetchProductDetailFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    message: null,
    success: false,
  });
};

//************** FETCH PRODUCTS ********************/

const fetchProductsStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    error: null,
    success: false,
  });
};

const fetchProductsSuccess = (state, action) => {
  return updateObject(state, {
    products: action.products,
    pages: action.pages,
    loading: false,
    success: false,
  });
};

const fetchProductsFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    message: null,
    success: false,
  });
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

    case actionTypes.DELETE_PRODUCT_START:
      return deleteProductStart(state, action);
    case actionTypes.DELETE_PRODUCT_SUCCESS:
      return deleteProductSuccess(state, action);
    case actionTypes.DELETE_PRODUCT_FAIL:
      return deleteProductFail(state, action);

    case actionTypes.UPDATE_PRODUCT_START:
      return updateProductStart(state, action);
    case actionTypes.UPDATE_PRODUCT_SUCCESS:
      return updateProductSuccess(state, action);
    case actionTypes.UPDATE_PRODUCT_FAIL:
      return updateProductFail(state, action);

    case actionTypes.CREATE_PRODUCT_START:
      return createProductStart(state, action);
    case actionTypes.CREATE_PRODUCT_SUCCESS:
      return createProductSuccess(state, action);
    case actionTypes.CREATE_PRODUCT_FAIL:
      return createProductFail(state, action);

    default:
      return state;
  }
};

export default productsReducer;
