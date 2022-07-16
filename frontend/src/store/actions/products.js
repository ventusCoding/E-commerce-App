import * as actionTypes from "./actionTypes";
import axios from "axios";

//************** FETCH PRODUCT BY ID ********************/

export const fetchProductDetailSuccess = (product) => {
  return {
    type: actionTypes.FETCH_PRODUCT_DETAIL_SUCCESS,
    product,
  };
};

export const fetchProductDetailFail = (error) => {
  return {
    type: actionTypes.FETCH_PRODUCT_DETAIL_FAIL,
    error,
  };
};
export const fetchProductDetailStart = () => {
  return {
    type: actionTypes.FETCH_PRODUCT_DETAIL_START,
  };
};

export const fetchProductDetail = (id) => {
  return (dispatch) => {
    dispatch(fetchProductDetailStart());

    axios
      .get(`/api/v1/products/${id}`)
      .then(({ data: { data } }) => {
        dispatch(fetchProductDetailSuccess(data));
      })
      .catch(
        ({
          response: {
            data: { message },
          },
        }) => {
          dispatch(fetchProductDetailFail(message));
        }
      );
  };
};

//************** FETCH PRODUCTS ********************/

export const fetchProductsSuccess = (products) => {
  return {
    type: actionTypes.FETCH_PRODUCTS_SUCCESS,
    products,
  };
};

export const fetchProductsFail = (error) => {
  return {
    type: actionTypes.FETCH_PRODUCTS_FAIL,
    error,
  };
};
export const fetchProductsStart = () => {
  return {
    type: actionTypes.FETCH_PRODUCTS_START,
  };
};

export const fetchProducts = () => {
  return (dispatch) => {
    dispatch(fetchProductsStart());

    axios
      .get("/api/v1/products")
      .then(({ data: { data } }) => {
        dispatch(fetchProductsSuccess(data));
      })
      .catch(
        ({
          response: {
            data: { message },
          },
        }) => {
          dispatch(fetchProductsFail(message));
        }
      );
  };
};
