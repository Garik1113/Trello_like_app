import {
  OPEN_CREATE_TEAM_WINDOW,
  CLOSE_CREATE_TEAM_WINDOW,
  GET_CURRENT_TEAMS,
  GET_CURRENT_TEAMS_FAILED,
  OPEN_TEAM_MENU,
} from "../constants";

const initialState = {
  isTeamWindowOpen: false,
  teamName: "",
  admin: "",
  currentTeams: [],
};

export const team = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_CREATE_TEAM_WINDOW:
      return { ...state, isTeamWindowOpen: true };
    case CLOSE_CREATE_TEAM_WINDOW:
      return { ...state, isTeamWindowOpen: false };
    case GET_CURRENT_TEAMS:
      return { ...state, currentTeams: action.payload };
    case GET_CURRENT_TEAMS_FAILED:
      return state;
    case OPEN_TEAM_MENU:
      return {
        ...state,
        currentTeams: state.currentTeams.map((e) =>
          e._id === action.payload
            ? { ...e, isOpenMenu: true, selected: true }
            : { ...e, isOpenMenu: false, selected: false }
        ),
      };
    default:
      return state;
  }
};
