import { GET_TEAM_BOARDS } from "../constants";

const initialState = {
  userBoards: [],
  teamBoards: [],
  currentBoard: {},
};

export const boards = (state = initialState, action) => {
  switch (action.type) {
    case GET_TEAM_BOARDS:
      return { ...state, teamBoards: action.payload };
    default:
      return state;
  }
};
