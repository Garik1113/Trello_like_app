import axios from "axios";
import { tokenConfig } from "./userActions";
import {
  CREATE_NEW_CARD,
  GET_ALL_BOARD_CARDS,
  TOGGLE_CURRENT_CARD_OPEN,
  GET_SEARCHING_MEMBERS,
  CLEAR_SEARCH_RESULTS,
  ADD_MEMBER_TO_CARD,
} from "../constants";
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

export const toggleCurrentCard = (card_id, bool) => {
  return {
    type: TOGGLE_CURRENT_CARD_OPEN,
    payload: { card_id, isOpen: bool },
  };
};

export const searchMembers = (memberEmail, board_id) => (
  dispatch,
  getState
) => {
  axios
    .post(
      "/cards/searchMembers",
      { board_id, memberEmail },
      tokenConfig(getState)
    )
    .then((res) => {
      if (res.status === 200) {
        return dispatch({
          type: GET_SEARCHING_MEMBERS,
          payload: res.data,
        });
      }
    })
    .catch((e) => returnErrors(e.response.data, e.response.status));
};

export const clearSearchResults = () => {
  return {
    type: CLEAR_SEARCH_RESULTS,
  };
};

export const addMemberToCard = (member, card_id) => (dispatch, getState) => {
  axios
    .post("/cards/addMemberToCard", { member, card_id }, tokenConfig(getState))
    .then((res) => {
      if (res.status === 200) {
        return dispatch({
          type: ADD_MEMBER_TO_CARD,
          payload: { member, card_id },
        });
      }
    })
    .catch((e) => returnErrors(e.response.data, e.response.status));
};
