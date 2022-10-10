import * as actionTypes from "./actionTypes";
import axios from "axios";

//************** RESET_ORDER_STATE ********************/
export const resetOrderState = () => {
  return {
    type: actionTypes.RESET_ORDER_STATE,
  };
};

//************** GET ALL ORDERS ********************/

export const getAllOrdersSuccess = (orders) => {
  return {
    type: actionTypes.GET_ALL_ORDERS_SUCCESS,
    orders,
  };
};
export const getAllOrdersFail = (error) => {
  return {
    type: actionTypes.GET_ALL_ORDERS_FAIL,
    error,
  };
};
export const getAllOrdersStart = () => {
  return {
    type: actionTypes.GET_ALL_ORDERS_START,
  };
};

export const getAllOrders = (token) => {
  return async (dispatch) => {
    dispatch(getAllOrdersStart());

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get(`/api/v1/orders`, config)
      .then(({ data: { data } }) => {
        console.log(data);
        dispatch(getAllOrdersSuccess(data));
      })
      .catch(
        ({
          response: {
            data: { message },
          },
        }) => {
          console.log(message);
          dispatch(getAllOrdersFail(message));
        }
      );
  };
};

//************** GET MY ORDERS ********************/

export const getMyOrdersSuccess = (orders) => {
  return {
    type: actionTypes.GET_MY_ORDERS_SUCCESS,
    orders,
  };
};
export const getMyOrdersFail = (error) => {
  return {
    type: actionTypes.GET_MY_ORDERS_FAIL,
    error,
  };
};
export const getMyOrdersStart = () => {
  return {
    type: actionTypes.GET_MY_ORDERS_START,
  };
};

export const getMyOrders = (token) => {
  return async (dispatch) => {
    dispatch(getMyOrdersStart());

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get(`/api/v1/orders/myorders`, config)
      .then(({ data: { data } }) => {
        console.log(data);
        dispatch(getMyOrdersSuccess(data));
      })
      .catch(
        ({
          response: {
            data: { message },
          },
        }) => {
          console.log(message);
          dispatch(getMyOrdersFail(message));
        }
      );
  };
};

//************** GET ORDER ********************/

export const getOrderSuccess = (order) => {
  return {
    type: actionTypes.GET_ORDER_SUCCESS,
    order,
  };
};
export const getOrderFail = (error) => {
  return {
    type: actionTypes.GET_ORDER_FAIL,
    error,
  };
};
export const getOrderStart = () => {
  return {
    type: actionTypes.GET_ORDER_START,
  };
};

export const getOrder = (id, token) => {
  return async (dispatch) => {
    dispatch(getOrderStart());

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    // console.log("getOrder action id", id);
    // console.log("getOrder action token", token);

    axios
      .get(`/api/v1/orders/${id}`, config)
      .then(({ data: { data } }) => {
        // console.log(data);
        dispatch(getOrderSuccess(data));
      })
      .catch(
        ({
          response: {
            data: { message },
          },
        }) => {
          console.log(message);
          dispatch(getOrderFail(message));
        }
      );
  };
};

//************** UPDATE ORDER TO PAY ********************/

export const updateOrderToPaySuccess = (order) => {
  return {
    type: actionTypes.CREATE_ORDER_SUCCESS,
    order,
  };
};
export const updateOrderToPayFail = (error) => {
  return {
    type: actionTypes.CREATE_ORDER_FAIL,
    error,
  };
};
export const updateOrderToPayStart = () => {
  return {
    type: actionTypes.CREATE_ORDER_START,
  };
};

export const updateOrderToPay = (orderId, paymentResult, token) => {
  return async (dispatch) => {
    dispatch(updateOrderToPayStart());

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .patch(`/api/v1/orders/${orderId}/pay`, paymentResult, config)
      .then(({ data: { data } }) => {
        dispatch(updateOrderToPaySuccess(data));
      })
      .catch(
        ({
          response: {
            data: { message },
          },
        }) => {
          dispatch(updateOrderToPayFail(message));
        }
      );
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

    // const orderItems = order.orderItems.map((item) => item.id);
    // order.orderItems = orderItems;

    order.orderItems.map((item) => {
      item.product = item.id;
    });

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
