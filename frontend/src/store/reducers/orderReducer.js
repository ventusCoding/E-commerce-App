import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../helpers/utility";

//************** Initial State ********************/

const initialState = {
  orders: [],
  loading: false,
  error: null,
  success: false,
  order: {},
  orderPayState: {
    loading: false,
    success: false,
    error: null,
    orderPay: {},
  },
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

//************** GET_ALL_ORDERS ********************/

export const getAllOrdersSuccess = (state, action) => {
  return updateObject(state, {
    orders: action.orders,
    loading: false,
    error: null,
    success: true,
  });
};

export const getAllOrdersFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    success: false,
  });
};

export const getAllOrdersStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    error: null,
    success: false,
  });
};

//************** GET_MY_ORDERS ********************/

export const getMyOrdersSuccess = (state, action) => {
  return updateObject(state, {
    orders: action.orders,
    loading: false,
    error: null,
    success: true,
  });
};

export const getMyOrdersFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    success: false,
  });
};

export const getMyOrdersStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    error: null,
    success: false,
  });
};

//************** GET_ORDER ********************/

export const getOrderSuccess = (state, action) => {
  return updateObject(state, {
    order: action.order,
    loading: false,
    error: null,
    success: true,
  });
};

export const getOrderFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    success: false,
  });
};

export const getOrderStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    error: null,
    success: false,
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

//************** UPDATE_ORDER_TO_PAY ********************/

export const updateOrderToPaySuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: null,
    success: true,
  });
};

export const updateOrderToPayFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    success: false,
  });
};

export const updateOrderToPayStart = (state, action) => {
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

    case actionTypes.GET_ORDER_START:
      return getOrderStart(state, action);
    case actionTypes.GET_ORDER_SUCCESS:
      return getOrderSuccess(state, action);
    case actionTypes.GET_ORDER_FAIL:
      return getOrderFail(state, action);

    case actionTypes.GET_ORDER_START:
      return updateOrderToPayStart(state, action);
    case actionTypes.GET_ORDER_SUCCESS:
      return updateOrderToPaySuccess(state, action);
    case actionTypes.GET_ORDER_FAIL:
      return updateOrderToPayFail(state, action);

    case actionTypes.GET_MY_ORDERS_START:
      return getMyOrdersStart(state, action);
    case actionTypes.GET_MY_ORDERS_SUCCESS:
      return getMyOrdersSuccess(state, action);
    case actionTypes.GET_MY_ORDERS_FAIL:
      return getMyOrdersFail(state, action);

    case actionTypes.GET_ALL_ORDERS_START:
      return getAllOrdersStart(state, action);
    case actionTypes.GET_ALL_ORDERS_SUCCESS:
      return getAllOrdersSuccess(state, action);
    case actionTypes.GET_ALL_ORDERS_FAIL:
      return getAllOrdersFail(state, action);

    case actionTypes.RESET_ORDER_STATE:
      return resetOrderState(state, action);

    default:
      return state;
  }
};

export default orderReducer;
