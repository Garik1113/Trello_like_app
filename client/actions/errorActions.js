import { GET_ERRORS, CLEAR_ERRORS } from "../constants";

export const returnErrors = (data, status) => {
  return {
    type: GET_ERRORS,
    payload: { data, status },
  };
};

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
