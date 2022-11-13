import axios from "axios";
import * as actionTypes from "./actionTypes";
import jwt_decode from "jwt-decode";
// import { setCookie, deleteCookie, getCookie } from "../../helpers/cookie";

//************** DELETE_USER ********************/

export const deleteUserSuccess = (id) => {
  return {
    type: actionTypes.DELETE_USER_SUCCESS,
    id: id,
  };
};
export const deleteUserFail = (error) => {
  return {
    type: actionTypes.DELETE_USER_FAIL,
    error,
  };
};

export const deleteUser = (token, id) => {
  return async (dispatch) => {
    dispatch(authStart());

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .delete(`/api/v1/users/${id}`, config)
      .then(({ data: { data } }) => {
        dispatch(deleteUserSuccess(id));
      })
      .catch(
        ({
          response: {
            data: { message },
          },
        }) => {
          console.log(message);
          dispatch(deleteUserFail(message));
        }
      );
  };
};

//************** GET_ALL_USERS ********************/

export const getAllUsersSuccess = (users) => {
  return {
    type: actionTypes.GET_ALL_USERS_SUCCESS,
    users,
  };
};
export const getAllUsersFail = (error) => {
  return {
    type: actionTypes.GET_ALL_USERS_FAIL,
    error,
  };
};

export const getAllUsers = (token) => {
  return async (dispatch) => {
    dispatch(authStart());

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get(`/api/v1/users`, config)
      .then(({ data: { data } }) => {
        console.log(data);
        dispatch(getAllUsersSuccess(data));
      })
      .catch(
        ({
          response: {
            data: { message },
          },
        }) => {
          console.log(message);
          dispatch(getAllUsersFail(message));
        }
      );
  };
};

//************** FETCH_USER_DATA ********************/

export const fetchUserDataSuccess = (user, loading, error) => {
  return {
    type: actionTypes.FETCH_USER_DATA_SUCCESS,
    user: user,
    loading: loading,
    error: error,
  };
};

export const fetchUserDataFail = (error) => {
  return {
    type: actionTypes.FETCH_USER_DATA_FAIL,
    error,
  };
};

export const fetchUserData = (userId, token) => {
  return (dispatch) => {
    dispatch(authStart());

    console.log("userId", userId);

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get(`/api/v1/users/${userId}`, config)
      .then(({ data: { data } }) => {
        dispatch(fetchUserDataSuccess(data, false, null));
      })
      .catch((error) => {
        dispatch(fetchUserDataFail(error.response.data.message));
      });
  };
};

//************** UPDATE_USER_STATE ********************/

export const updateUserSuccess = (user, loading, error, message) => {
  return {
    type: actionTypes.UPDATE_USER_SUCCESS,
    user: user,
    loading: loading,
    error: error,
    message: message,
  };
};

export const updateUserFail = (error) => {
  return {
    type: actionTypes.UPDATE_USER_FAIL,
    error,
  };
};

export const updateUser = (data, token) => {
  return (dispatch) => {
    dispatch(authStart());

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const userData = {
      email: data.email,
      name: data.name,
    };

    const userPassword = {
      password: data.password,
      passwordConfirm: data.passwordConfirm,
      passwordCurrent: data.passwordCurrent,
    };

    if (
      data.password !== "" &&
      data.passwordConfirm !== "" &&
      data.passwordCurrent !== ""
    ) {
      axios
        .patch(`/api/v1/users/updateMyPassword`, userPassword, config)
        .then(({ data: { data } }) => {
          dispatch(
            updateUserSuccess(data, false, null, "Profile updated successfully")
          );
        })
        .catch((error) => {
          dispatch(updateUserFail(error.response.data.message));
        });
    }

    if (data.name !== "" || data.email !== "") {
      axios
        .patch(`/api/v1/users/updateMe`, userData, config)
        .then(({ data: { data } }) => {
          dispatch(
            updateUserSuccess(data, false, null, "Profile updated successfully")
          );
        })
        .catch((error) => {
          dispatch(updateUserFail(error.response.data.message));
        });
    }
  };
};

//************** RESET_AUTH_STATE ********************/

export const resetAuthState = () => {
  return {
    type: actionTypes.RESET_AUTH_STATE,
  };
};

//************** AUTH ********************/

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, userId, user) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token,
    userId,
    user,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error,
  };
};

export const auth = (email, password) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email,
      password,
    };

    const config = { headers: { "Content-Type": "application/json" } };

    axios
      .post(`/api/v1/users/login`, authData, config)
      .then((res) => {
        // setCookie("jwt", res.data.token, { expires: 90 });
        localStorage.setItem("jwt", res.data.token);

        let loadedUser = {};
        loadedUser.name = res.data.data.name;
        loadedUser.email = res.data.data.email;
        loadedUser.photo = res.data.data.photo;
        loadedUser.role = res.data.data.role;

        dispatch(authSuccess(res.data.token, res.data.data._id, loadedUser));
      })
      .catch(function (error) {
        dispatch(authFail(error.response.data.message));
      });
  };
};

//************** LOGOUT ********************/

export const logout = () => {
  // deleteCookie("jwt");
  localStorage.removeItem("jwt");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

//************** SIGNUP ********************/

export const signupStart = () => {
  return {
    type: actionTypes.SIGNUP_START,
  };
};

export const signupSuccess = (message) => {
  return {
    type: actionTypes.SIGNUP_SUCCESS,
    message,
  };
};

export const signupFail = (error) => {
  return {
    type: actionTypes.SIGNUP_FAIL,
    error,
  };
};

export const signup = (data) => {
  return (dispatch) => {
    dispatch(signupStart());

    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("passwordConfirm", data.passwordConfirm);
    if (data.photo) {
      formData.append("photo", data.photo[0]);
    }

    const config = { headers: { "Content-Type": "application/json" } };
    axios
      .post(`/api/v1/users/signup`, formData, config)
      .then((res) => {
        console.log("res", res.data.message);
        dispatch(signupSuccess(res.data.message));
      })
      .catch(function (error) {
        dispatch(signupFail(error.response.data.message));
      });
  };
};

//************** AUTH_EMAIL_VERIFICATION ********************/

export const emailVerification = (token) => {
  return (dispatch) => {
    dispatch(authStart());

    axios
      .patch(`/api/v1/users/emailVerification/${token}`)
      .then((res) => {
        dispatch(authSuccessMessage(res.data.message));
      })
      .catch(function (error) {
        dispatch(authFail(error.response.data.message));
        // dispatch(authSuccessMessage(error.response.data.message));
      });
  };
};

//************** CHECK_AUTH_STATE ********************/

export const checkAuthState = () => {
  return (dispatch) => {
    dispatch(authStart());
    // const token = getCookie("jwt");
    const token = localStorage.getItem("jwt");

    if (token) {
      const decoded = jwt_decode(token);
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        dispatch(logout());
      } else {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        axios
          .get(`/api/v1/users/${decoded.id}`, config)
          .then((response) => {
            let loadedUser = {};
            loadedUser.name = response.data.data.name;
            loadedUser.email = response.data.data.email;
            loadedUser.photo = response.data.data.photo;
            loadedUser.role = response.data.data.role;

            dispatch(authSuccess(token, response.data.data._id, loadedUser));
          })
          .catch((error) => {
            dispatch(authFail(error.response.data.message));
          });
      }
    } else {
      dispatch(authFail("You are not logged in ! Please login to get access."));
    }
  };
};
