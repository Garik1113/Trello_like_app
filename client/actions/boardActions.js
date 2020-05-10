import axios from "axios";
import { tokenConfig } from "./userActions";
import {
  GET_TEAM_BOARDS,
  TOGGLE_BOARD_CREATE_MENU,
  CREATE_NEW_BOARD,
} from "../constants";
import { returnErrors } from "./errorActions";
import history from "../history";

export const getTeamBoards = (team_id) => (dispatch, getState) => {
  axios
    .get(`/boards/getTeamBoards/${team_id}`, tokenConfig(getState))
    .then((res) => {
      if (res.status === 200) {
        dispatch({
          type: GET_TEAM_BOARDS,
          payload: res.data,
        });
      }
    })
    .catch((e) => returnErrors(e.response.data, e.response.status));
};

export const getUserBoards = (user_id) => (dispatch, getState) => {};

export const toggleBoardCreateMenu = (bool) => {
  return {
    type: TOGGLE_BOARD_CREATE_MENU,
    payload: bool,
  };
};

export const createNewBoard = (boardName, team_id) => (dispatch, getState) => {
  axios
    .post("/boards/create", { boardName, team_id }, tokenConfig(getState))
    .then((res) => {
      if (res.status === 200) {
        dispatch({
          type: CREATE_NEW_BOARD,
          payload: res.data,
        });
        return history.push(`/boards/pages/${res.data._id}`);
      } else {
        return history.push(`/teams/pages/${team_id}`);
      }
    })
    .catch((e) => returnErrors(e.response.data, e.response.status));
};
