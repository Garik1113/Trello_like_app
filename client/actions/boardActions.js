import axios from "axios";
import { tokenConfig } from "./userActions";
import { GET_TEAM_BOARDS } from "../constants";
import { returnErrors } from "./errorActions";

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
