import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../helpers/utility";

//************** Initial State ********************/

const initialState = {
  cartItems: [],
  loading: false,
  error: null,
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

  console.log(cartItems);
  console.log(newCart);
  

  localStorage.setItem("cartItems", JSON.stringify(cartItems));

  return updateObject(state, {
    loading: false,
    cartItems: state.cartItems.concat(newCart),
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

    default:
      return state;
  }
};

export default cartReducer;
