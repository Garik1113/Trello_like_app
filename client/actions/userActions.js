import axios from "axios";
import { returnErrors, clearErrors } from "./errorActions";
import {
  SIGN_UP,
  SIGN_UP_FAILED,
  GET_PROFILE_DATA,
  GET_PROFILE_DATA_FAILED,
  LOG_OUT,
  LOG_IN,
  LOG_IN_FAILED,
  TOGGLE_USER_MENU,
} from "../constants";
import history from "../history";

export const signup = (user) => (dispatch, getState) => {
  axios
    .post("/users/signup", user)
    .then((res) => {
      if (res.status === 200) {
        dispatch({
          type: SIGN_UP,
          payload: res.data.token,
        });
        return dispatch(clearErrors());
      } else {
        return dispatch({
          type: SIGN_UP_FAILED,
        });
      }
    })
    .catch((error) => {
      return dispatch(returnErrors(error.response.data, error.response.status));
    });
};

export const login = (user) => (dispatch) => {
  axios
    .post("/users/login", user)
    .then((res) => {
      if (res.status === 200) {
        dispatch(clearErrors());
        return dispatch({
          type: LOG_IN,
          payload: res.data.token,
        });
      } else {
        return dispatch({
          type: LOG_IN_FAILED,
        });
      }
    })
    .catch((error) => {
      dispatch(returnErrors(error.response.data, error.response.status));
    });
};

export const getProfileData = () => (dispatch, getState) => {
  axios
    .get("/users/getProfileData", tokenConfig(getState))
    .then((res) => {
      if (res.status === 200) {
        dispatch({
          type: GET_PROFILE_DATA,
          payload: res.data,
        });
        return dispatch(clearErrors());
      } else {
        dispatch({
          type: GET_PROFILE_DATA_FAILED,
        });
      }
    })
    .catch((error) => {
      return dispatch(returnErrors(error.response.data, error.response.status));
    });
};

export const logOut = () => (dispatch) => {
  dispatch(clearErrors());
  history.push("/");
  dispatch({
    type: TOGGLE_USER_MENU,
  });
  return dispatch({
    type: LOG_OUT,
  });
};

export const tokenConfig = (getState) => {
  const token = getState().user.token || localStorage.getItem("access_token");
  if (token) {
    return {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
  } else {
    return null;
  }
};

export const toggleUserMenu = () => (dispatch) => {
  return dispatch({
    type: TOGGLE_USER_MENU,
  });
};
