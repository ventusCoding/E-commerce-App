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
  users: [],
};

//************** DELETE_USER ********************/

export const deleteUserSuccess = (state, action) => {
  const updatedUsers = state.users.filter((user) => user._id !== action.id);
  return updateObject(state, {
    users: updatedUsers,
    loading: false,
    error: null,
  });
};

export const deleteUserFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    success: false,
  });
};

//************** GET_ALL_USERS ********************/

export const getAllUsersSuccess = (state, action) => {
  return updateObject(state, {
    users: action.users,
    loading: false,
    error: null,
    success: true,
  });
};

export const getAllUsersFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    success: false,
  });
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

const signupStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};

const signupSuccess = (state, action) => {
  return updateObject(state, {
    message: action.message,
    loading: false,
    error: null,
  });
};

const signupFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    message: "",
  });
};

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

    case actionTypes.SIGNUP_START:
      return signupStart(state, action);
    case actionTypes.SIGNUP_SUCCESS:
      return signupSuccess(state, action);
    case actionTypes.SIGNUP_FAIL:
      return signupFail(state, action);

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

    case actionTypes.GET_ALL_USERS_SUCCESS:
      return getAllUsersSuccess(state, action);
    case actionTypes.GET_ALL_USERS_FAIL:
      return getAllUsersFail(state, action);

    case actionTypes.DELETE_USER_SUCCESS:
      return deleteUserSuccess(state, action);
    case actionTypes.DELETE_USER_FAIL:
      return deleteUserFail(state, action);

    default:
      return state;
  }
};

export default authReducer;
