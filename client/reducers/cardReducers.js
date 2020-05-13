import { CREATE_NEW_CARD, GET_ALL_BOARD_CARDS } from "../constants";

const initialState = {
  currentCard: {},
  cards: [],
};

export const card = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_NEW_CARD:
      return { ...state, cards: [...state.cards, action.payload] };
    case GET_ALL_BOARD_CARDS:
      return { ...state, cards: action.payload };
    default:
      return state;
  }
};
