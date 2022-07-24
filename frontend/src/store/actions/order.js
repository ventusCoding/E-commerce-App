import * as actionTypes from "./actionTypes";
import axios from "axios";

//************** RESET_ORDER_STATE ********************/
export const resetOrderState = () => {
  return {
    type: actionTypes.RESET_ORDER_STATE,
  };
};

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

export const createOrder = (order, token) => {
  return async (dispatch) => {
    dispatch(createOrderStart());

    const orderItems = order.orderItems.map((item) => item.id);
    order.orderItems = orderItems;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .post("/api/v1/orders", order, config)
      .then(({ data: { data } }) => {
        dispatch(createOrderSuccess(data));
      })
      .catch(
        (
          {
          response: {
            data: { message },
          },
        }
        
        ) => {
          dispatch(createOrderFail(message));
        }
      );
  };
};
