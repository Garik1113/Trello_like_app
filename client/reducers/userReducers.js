import {
  SIGN_UP,
  SIGN_UP_FAILED,
  LOG_IN,
  GET_PROFILE_DATA_FAILED,
  LOG_IN_FAILED,
  LOG_OUT,
  LOG_OUT_FAILED,
  GET_PROFILE_DATA,
  TOGGLE_USER_MENU,
} from "../constants";

const initialState = {
  user: "",
  isAuthorizated: false,
  token: "",
  userMenuOpen: false,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP:
    case LOG_IN:
      localStorage.setItem("access_token", action.payload);
      return { ...state, token: action.payload, isAuthorizated: true };
    case LOG_OUT:
      localStorage.removeItem("access_token");
      return { ...state, user: null, token: "", isAuthorizated: false };
    case GET_PROFILE_DATA:
      return { ...state, user: action.payload, isAuthorizated: true };
    case TOGGLE_USER_MENU:
      return { ...state, userMenuOpen: !state.userMenuOpen };
    case LOG_IN_FAILED:
    case LOG_OUT_FAILED:
    case SIGN_UP_FAILED:
    case GET_PROFILE_DATA_FAILED:
      return state;
    default:
      return state;
  }
};
