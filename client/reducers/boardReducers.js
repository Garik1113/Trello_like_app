import {
  GET_TEAM_BOARDS,
  TOGGLE_BOARD_CREATE_MENU,
  CREATE_NEW_BOARD,
  GET_USER_BOARDS,
  GET_CURRENT_BOARD,
} from "../constants";

const initialState = {
  userBoards: [],
  teamBoards: [],
  currentBoard: {},
  isCreatBoardMenuOpen: false,
};

export const boards = (state = initialState, action) => {
  switch (action.type) {
    case GET_TEAM_BOARDS:
      return { ...state, teamBoards: action.payload };
    case CREATE_NEW_BOARD:
      return {
        ...state,
        // teamBoards: [...state.teamBoards, action.payload],
        isCreatBoardMenuOpen: false,
        userBoards: [...state.userBoards, action.payload],
        currentBoard: action.payload,
      };
    case GET_CURRENT_BOARD:
      return { ...state, currentBoard: action.payload };
    case GET_USER_BOARDS:
      return { ...state, userBoards: action.payload };
    case TOGGLE_BOARD_CREATE_MENU:
      return { ...state, isCreatBoardMenuOpen: action.payload };
    default:
      return state;
  }
};
