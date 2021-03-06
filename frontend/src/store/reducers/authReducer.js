import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../helpers/utility";

//************** Initial State ********************/

const initialState = {
  token: null,
  userId: null,
  user: null,
  isAuthenticated: false,
  error: null,
  message: "",
  loading: false,
};

//************** FETCH_USER_DATA ********************/

const fetchUserDataSuccess = (state, action) => {
  return updateObject(state, {
    user: action.user,
    loading: false,
    error: null,
  });
};

const fetchUserDataFail = (state, action) => {
  return updateObject(state, { error: action.error, loading: false });
};

//************** UPDATE_USER_STATE ********************/

const updateUserSuccess = (state, action) => {
  return updateObject(state, {
    user: action.user,
    loading: false,
    error: null,
    message: action.message,
  });
};

const updateUserFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    message: "",
  });
};

//************** RESET_AUTH_STATE ********************/

const resetAuthState = (state, action) => {
  return updateObject(state, {
    token: null,
    userId: null,
    user: null,
    isAuthenticated: false,
    error: null,
    message: "",
    loading: false,
  });
};

//************** AUTH ********************/

const authStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.token,
    loading: false,
    error: null,
    userId: action.userId,
    user: action.user,
    isAuthenticated: true,
  });
};
const authFail = (state, action) => {
  return updateObject(state, { error: action.error, loading: false });
};

//************** LOGOUT ********************/

const authLogout = (state, action) => {
  return updateObject(state, {
    token: null,
    userId: null,
    user: null,
    isAuthenticated: false,
    error: null,
    message: "",
    loading: false,
    authResult: null,
  });
};

//************** AUTH REDUCER ********************/

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);

    case actionTypes.RESET_AUTH_STATE:
      return resetAuthState(state, action);
    case actionTypes.UPDATE_USER_SUCCESS:
      return updateUserSuccess(state, action);
    case actionTypes.UPDATE_USER_FAIL:
      return updateUserFail(state, action);
    case actionTypes.FETCH_USER_DATA_SUCCESS:
      return fetchUserDataSuccess(state, action);
    case actionTypes.FETCH_USER_DATA_FAIL:
      return fetchUserDataFail(state, action);

    default:
      return state;
  }
};

export default authReducer;
