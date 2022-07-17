import * as actionTypes from "./actionTypes";
import axios from "axios";

//************** REMOVE CART ********************/

export const removeCartSuccess = (cart) => {
  return {
    type: actionTypes.REMOVE_CART_SUCCESS,
    cart,
  };
};

export const removeCartFail = (error) => {
  return {
    type: actionTypes.REMOVE_CART_FAIL,
    error,
  };
};
export const removeCartStart = () => {
  return {
    type: actionTypes.REMOVE_CART_START,
  };
};

export const removeCart = (id) => {
  return async (dispatch) => {
    dispatch(addCartStart());

    const {
      data: { data },
    } = await axios.get(`/api/v1/products/${id}`);

    if (!data) {
      dispatch(addCartFail("No product found with that ID"));
    }

    dispatch(removeCartSuccess(data));
  };
};

//************** ADD CART ********************/

export const addCartSuccess = (cart) => {
  return {
    type: actionTypes.ADD_CART_SUCCESS,
    cart,
  };
};

export const addCartFail = (error) => {
  console.log(error);
  return {
    type: actionTypes.ADD_CART_FAIL,
    error,
  };
};
export const addCartStart = () => {
  return {
    type: actionTypes.ADD_CART_START,
  };
};

export const addCart = (id, qty) => {
  return async (dispatch) => {
    dispatch(addCartStart());

    const {
      data: { data },
    } = await axios.get(`/api/v1/products/${id}`);

    if (!data) {
      dispatch(addCartFail("No product found with that ID"));
    }

    const cartItems = JSON.parse(localStorage.getItem("cartItems"));

    if (cartItems) {
      const cartItem = cartItems.find((cart) => cart.id === id);

      if (cartItem) {
        if (cartItem.countInStock < (cartItem.qty + qty)) {
          dispatch(addCartFail("Not enough countInStock"));
          return;
        } else {
          cartItem.qty += qty;
          dispatch(addCartSuccess(cartItem));
          return;
        }
      }
    }

    const cart = {
      id: data._id,
      name: data.name,
      price: data.price,
      isExternal : data.isExternal,
      qty: qty,
      image: data.image,
      countInStock: data.countInStock,
    };

    dispatch(addCartSuccess(cart));
  };
};
