import { CREATE_NEW_LIST, GET_LISTS } from "../constants";

const initialState = {
  lists: [],
  currentList: {},
};

export const list = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_NEW_LIST:
      return { ...state, lists: [...state.lists, action.payload] };
    case GET_LISTS:
      return { ...state, lists: action.payload };
    default:
      return state;
  }
};
