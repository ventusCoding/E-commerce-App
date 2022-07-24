import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../helpers/utility";

//************** Initial State ********************/

const initialState = {
  orders: [],
  loading: false,
  error: null,
  success: false,
  order: {},
};

//************** RESET_ORDER_STATE ********************/

const resetOrderState = (state, action) => {
  return updateObject(state, {
    orders: [],
    loading: false,
    error: null,
    success: false,
    order: {},
  });
};

//************** CREATE_ORDER ********************/

export const createOrderSuccess = (state, action) => {
  return updateObject(state, {
    order: action.order,
    loading: false,
    error: null,
    success: true,
  });
};

export const createOrderFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    success: false,
  });
};

export const createOrderStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    error: null,
    success: false,
  });
};

//************** ORDER_REDUCER ********************/

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_ORDER_START:
      return createOrderStart(state, action);
    case actionTypes.CREATE_ORDER_SUCCESS:
      return createOrderSuccess(state, action);
    case actionTypes.CREATE_ORDER_FAIL:
      return createOrderFail(state, action);
    case actionTypes.RESET_ORDER_STATE:
      return resetOrderState(state, action);

    default:
      return state;
  }
};

export default orderReducer;
