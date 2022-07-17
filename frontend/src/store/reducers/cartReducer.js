import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../helpers/utility";

//************** Initial State ********************/

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  loading: false,
  error: null,
};

//************** UPDATE CART QTY ********************/

const updateCartQtyStart = (state, action) => {
  return updateObject(state, {
    loading: true,
  });
};

const updateCartQtySuccess = (state, action) => {
//update qty in state.cartItems
  const newCart = state.cartItems.map((cart) => {
    if (cart.id === action.cart.id) {
      return action.cart;
    }
    return cart;
  }
  );

  localStorage.setItem("cartItems", JSON.stringify(newCart));

  return updateObject(state, {
    cartItems: newCart,
    loading: false,
  });
};

const updateCartQtyFail = (state, action) => {
  return updateObject(state, { error: action.error, loading: false });
};

//************** REMOVE CART ********************/

const removeCartStart = (state, action) => {
  return updateObject(state, {
    loading: true,
  });
};

const removeCartSuccess = (state, action) => {
  const newCart = state.cartItems.filter((cart) => cart.id !== action.cart.id);

  localStorage.setItem("cartItems", JSON.stringify(newCart));

  return updateObject(state, {
    cartItems: newCart,
    loading: false,
  });
};

const removeCartFail = (state, action) => {
  return updateObject(state, { error: action.error, loading: false });
};

//************** ADD CART ********************/

const addCartStart = (state, action) => {
  return updateObject(state, {
    loading: true,
  });
};

const addCartSuccess = (state, action) => {
  const newCart = updateObject(action.cart);

  //update state cartItems if newCart already exists
  const cartItems = state.cartItems.filter((cart) => cart.id !== newCart.id);

  cartItems.push(newCart);

  localStorage.setItem("cartItems", JSON.stringify(cartItems));

  return updateObject(state, {
    loading: false,
    cartItems: cartItems,
  });
};

const addCartFail = (state, action) => {
  return updateObject(state, { error: action.error, loading: false });
};

//************** CART REDUCER ********************/

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_CART_START:
      return addCartStart(state, action);
    case actionTypes.ADD_CART_SUCCESS:
      return addCartSuccess(state, action);
    case actionTypes.ADD_CART_FAIL:
      return addCartFail(state, action);

    case actionTypes.REMOVE_CART_START:
      return removeCartStart(state, action);
    case actionTypes.REMOVE_CART_SUCCESS:
      return removeCartSuccess(state, action);
    case actionTypes.REMOVE_CART_FAIL:
      return removeCartFail(state, action);

    case actionTypes.UPDATE_CART_QTY_START:
      return updateCartQtyStart(state, action);
    case actionTypes.UPDATE_CART_QTY_SUCCESS:
      return updateCartQtySuccess(state, action);
    case actionTypes.UPDATE_CART_QTY_FAIL:
      return updateCartQtyFail(state, action);

    default:
      return state;
  }
};

export default cartReducer;
