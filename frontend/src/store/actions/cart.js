import * as actionTypes from "./actionTypes";
import axios from "axios";

//************** SAVE_SHIPPING_PAYMENT ********************/

export const saveShippingPayment = (paymentMethode) => {
  return {
    type: actionTypes.SAVE_SHIPPING_PAYMENT,
    paymentMethode: paymentMethode,
  };
};

//************** SAVE_SHIPPING_ADDRESS ********************/

export const saveShippingAddress = (shippingAdress) => {
  return {
    type: actionTypes.SAVE_SHIPPING_ADDRESS,
    shippingAdress: shippingAdress,
  };
};

//************** UPDATE CART QTY ********************/

export const updateCartQtySuccess = (cart) => {
  return {
    type: actionTypes.UPDATE_CART_QTY_SUCCESS,
    cart,
  };
};

export const updateCartQtyFail = (error) => {
  return {
    type: actionTypes.UPDATE_CART_QTY_FAIL,
    error,
  };
};
export const updateCartQtyStart = () => {
  return {
    type: actionTypes.UPDATE_CART_QTY_START,
  };
};

export const updateCartQty = (cart, qty) => {
  return async (dispatch) => {
    dispatch(addCartStart());

    cart.qty = parseInt(qty);

    dispatch(updateCartQtySuccess(cart));
  };
};

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
        if (cartItem.countInStock < parseInt(cartItem.qty) + parseInt(qty)) {
          dispatch(addCartFail("Not enough countInStock"));
          return;
        } else {
          cartItem.qty += parseInt(qty);
          dispatch(addCartSuccess(cartItem));
          return;
        }
      }
    }

    const cart = {
      id: data._id,
      name: data.name,
      price: data.price,
      isExternal: data.isExternal,
      qty: parseInt(qty),
      image: data.image,
      countInStock: data.countInStock,
    };

    dispatch(addCartSuccess(cart));
  };
};
