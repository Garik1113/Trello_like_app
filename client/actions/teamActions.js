import axios from "axios";
import { tokenConfig } from "./userActions";
import {
  OPEN_CREATE_TEAM_WINDOW,
  CLOSE_CREATE_TEAM_WINDOW,
  GET_CURRENT_TEAMS,
  GET_CURRENT_TEAMS_FAILED,
  OPEN_TEAM_MENU,
} from "../constants";
import { returnErrors, clearErrors } from "./errorActions";

export const createTeam = (team, history) => (dispatch, getState) => {
  axios.post("/teams/create", team, tokenConfig(getState)).then((res) => {
    // history.push("/login");
  });
};

export const openCreateTeamWindow = () => (dispatch) => {
  return dispatch({
    type: OPEN_CREATE_TEAM_WINDOW,
  });
};
export const closeCreateTeamWindow = () => (dispatch) => {
  return dispatch({
    type: CLOSE_CREATE_TEAM_WINDOW,
  });
};

export const getCurrentTeams = () => (dispatch, getState) => {
  axios
    .get("/teams/getCurrentTeams", tokenConfig(getState))
    .then((res) => {
      if (res.status === 200) {
        clearErrors();
        return dispatch({
          type: GET_CURRENT_TEAMS,
          payload: res.data,
        });
      } else {
        return dispatch({
          type: GET_CURRENT_TEAMS_FAILED,
        });
      }
    })
    .catch((e) => returnErrors(e.response.data, e.response.status));
};

export const openTeamMenu = (id) => (dispatch) => {
  return dispatch({
    type: OPEN_TEAM_MENU,
    payload: id,
  });
};
