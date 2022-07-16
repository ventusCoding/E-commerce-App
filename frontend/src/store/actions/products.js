import * as actionTypes from "./actionTypes";
import axios from "axios";

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

export const fetchProducts = (token) => {
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
