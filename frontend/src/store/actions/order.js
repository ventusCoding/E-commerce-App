import * as actionTypes from "./actionTypes";
import axios from "axios";

//************** CREATE ORDER ********************/

export const createOrderSuccess = (order) => {
  return {
    type: actionTypes.CREATE_ORDER_SUCCESS,
    order,
  };
};
export const createOrderFail = (error) => {
  return {
    type: actionTypes.CREATE_ORDER_FAIL,
    error,
  };
};
export const createOrderStart = () => {
  return {
    type: actionTypes.CREATE_ORDER_START,
  };
};
export const createOrder = (order) => {
  return async (dispatch) => {
    dispatch(createOrderStart());
    axios
      .post("/api/v1/orders", order)
      .then(({ data: { data } }) => {
        dispatch(createOrderSuccess(data));
      })
      .catch(
        ({
          response: {
            data: { message },
          },
        }) => {
          dispatch(createOrderFail(message));
        }
      );
  };
};
