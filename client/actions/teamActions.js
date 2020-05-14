import axios from "axios";
import { tokenConfig } from "./userActions";
import {
  OPEN_CREATE_TEAM_WINDOW,
  CLOSE_CREATE_TEAM_WINDOW,
  GET_TEAMS,
  GET_TEAMS_FAILED,
  OPEN_TEAM_MENU,
  CREATE_NEW_TEAM,
  GET_CURRENT_TEAM,
  GET_CURRENT_TEAM_FAILED,
  ACTIVATE_BOARDS_SETTING,
  ACTIVATE_MEMBERS_SETTING,
  ACTIVATE_SETTINGS_SETTING,
  SELECT_TEAM,
} from "../constants";
import { returnErrors, clearErrors } from "./errorActions";

export const createTeam = (team, history) => (dispatch, getState) => {
  axios
    .post("/teams/create", team, tokenConfig(getState))
    .then((res) => {
      if (res.status === 200) {
        dispatch({
          type: CREATE_NEW_TEAM,
          payload: res.data,
        });
        history.push(`/teams/pages/${res.data._id}`);
        return dispatch({
          type: CLOSE_CREATE_TEAM_WINDOW,
        });
      }
    })
    .catch((e) => returnErrors(e.response.data, e.response.status));
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

export const getTeams = () => (dispatch, getState) => {
  axios
    .get("/teams/getTeams", tokenConfig(getState))
    .then((res) => {
      if (res.status === 200) {
        clearErrors();
        return dispatch({
          type: GET_TEAMS,
          payload: res.data,
        });
      } else {
        return dispatch({
          type: GET_TEAMS_FAILED,
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

export const getCurrentTeam = (id) => (dispatch, getState) => {
  axios
    .get(`/teams/getTeamData/${id}`, tokenConfig(getState))
    .then((res) => {
      if (res.status === 200) {
        clearErrors();
        return dispatch({
          type: GET_CURRENT_TEAM,
          payload: res.data.team,
        });
      } else {
        return dispatch({
          type: GET_CURRENT_TEAM_FAILED,
        });
      }
    })
    .catch((error) => returnErrors(error.response.data, error.response.status));
};

export const activateBoardsSetting = () => {
  return {
    type: ACTIVATE_BOARDS_SETTING,
  };
};

export const activateMembersSetting = () => {
  return {
    type: ACTIVATE_MEMBERS_SETTING,
  };
};

export const activateSettingsSetting = () => {
  return {
    type: ACTIVATE_SETTINGS_SETTING,
  };
};

export const selectTeam = (team_id) => {
  return {
    type: SELECT_TEAM,
    payload: team_id,
  };
};

export const inviteMembers = (email, team_id) => (dispatch, getState) => {
  axios
    .post("/teams/invite", { email, team_id }, tokenConfig(getState))
    .catch((e) => returnErrors(e.response.data, e.response.status));
};
