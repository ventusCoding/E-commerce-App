import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../helpers/utility";

//************** Initial State ********************/

const initialState = {
    orders: [],
    loading: false,
    error: null,
    order:{},
};

//************** CREATE_ORDER ********************/

export const createOrderSuccess = (order) => {
    return {
        type: actionTypes.CREATE_ORDER_SUCCESS,
        order,
    };
}

export const createOrderFail = (error) => {
    return {
        type: actionTypes.CREATE_ORDER_FAIL,
        error,
    };
}

export const createOrderStart = () => {
    return {
        type: actionTypes.CREATE_ORDER_START,
    };
}

//************** ORDER_REDUCER ********************/

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_ORDER_START:
            return createOrderStart(state, action);
        case actionTypes.CREATE_ORDER_SUCCESS:
            return createOrderSuccess(state, action);
        case actionTypes.CREATE_ORDER_FAIL:
            return createOrderFail(state, action);
        default:
            return state;
    }
}

export default orderReducer;