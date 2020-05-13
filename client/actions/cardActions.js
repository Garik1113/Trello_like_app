import axios from "axios";
import { tokenConfig } from "./userActions";
import { CREATE_NEW_CARD, GET_ALL_BOARD_CARDS } from "../constants";
import { returnErrors } from "./errorActions";

export const createNewCard = (name, list_id, board_id) => (
  dispatch,
  getState
) => {
  axios
    .post("/cards/create", { name, list_id, board_id }, tokenConfig(getState))
    .then((res) => {
      if (res.status === 200) {
        return dispatch({
          type: CREATE_NEW_CARD,
          payload: res.data,
        });
      }
    })
    .catch((e) => returnErrors(e.response.data, e.response.status));
};

export const getAllBoardCards = (board_id) => (dispatch, getState) => {
  axios
    .get(`/cards/getBoardCards/${board_id}`, tokenConfig(getState))
    .then((res) => {
      if (res.status === 200) {
        return dispatch({
          type: GET_ALL_BOARD_CARDS,
          payload: res.data,
        });
      }
    })
    .catch((e) => returnErrors(e.response.data, e.response.status));
};

export const changeCardList = (card_id, list_id) => (dispatch, getState) => {
  axios
    .post("/cards/changeCardList", { card_id, list_id }, tokenConfig(getState))
    .then((res) => {
      if (res.status === 200) {
        return;
      }
    })
    .catch((e) => returnErrors(e.response.data, e.response.status));
};
