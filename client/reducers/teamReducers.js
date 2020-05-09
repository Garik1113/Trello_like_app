import {
  OPEN_CREATE_TEAM_WINDOW,
  CLOSE_CREATE_TEAM_WINDOW,
  GET_TEAMS,
  GET_TEAMS_FAILED,
  OPEN_TEAM_MENU,
  CREATE_NEW_TEAM,
  GET_CURRENT_TEAM,
  ACTIVATE_BOARDS_SETTING,
  ACTIVATE_MEMBERS_SETTING,
  ACTIVATE_SETTINGS_SETTING,
} from "../constants";

const initialState = {
  isTeamWindowOpen: false,
  teamName: "",
  admin: "",
  teams: [],
  currentTeam: {},
  activeSetting: "boards",
};

export const team = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_NEW_TEAM:
      return {
        ...state,
        teams: [...state.teams, action.payload],
      };
    case OPEN_CREATE_TEAM_WINDOW:
      return { ...state, isTeamWindowOpen: !state.isTeamWindowOpen };
    case CLOSE_CREATE_TEAM_WINDOW:
      return { ...state, isTeamWindowOpen: false };
    case GET_TEAMS:
      return { ...state, teams: action.payload };
    case GET_TEAMS_FAILED:
      return state;
    case GET_CURRENT_TEAM:
      return { ...state, currentTeam: action.payload };
    case GET_TEAMS_FAILED:
      return state;
    case ACTIVATE_BOARDS_SETTING:
      return { ...state, activeSetting: "boards" };
    case ACTIVATE_MEMBERS_SETTING:
      return { ...state, activeSetting: "members" };
    case ACTIVATE_SETTINGS_SETTING:
      return { ...state, activeSetting: "settings" };
    case OPEN_TEAM_MENU:
      return {
        ...state,
        teams: state.teams.map((e) =>
          e._id === action.payload
            ? { ...e, isOpenMenu: true, selected: true }
            : { ...e, isOpenMenu: false, selected: false }
        ),
      };
    default:
      return state;
  }
};
