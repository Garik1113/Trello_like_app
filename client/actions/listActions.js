import axios from "axios";
import { tokenConfig } from "./userActions";
import { CREATE_NEW_LIST, GET_LISTS } from "../constants";
import { returnErrors } from "./errorActions";

export const addNewList = (name, board_id) => (dispatch, getState) => {
  axios
    .post("/lists/create", { name, board_id }, tokenConfig(getState))
    .then((res) => {
      if (res.status === 200) {
        return dispatch({
          type: CREATE_NEW_LIST,
          payload: res.data,
        });
      }
    })
    .catch((e) => returnErrors(e.response.data, e.response.status));
};

export const getLists = (board_id) => (dispatch, getState) => {
  axios
    .get(`/lists/get/${board_id}`, tokenConfig(getState))
    .then((res) => {
      if (res.status === 200) {
        return dispatch({
          type: GET_LISTS,
          payload: res.data,
        });
      }
    })
    .catch((e) => returnErrors(e.response.data, e.response.status));
};
