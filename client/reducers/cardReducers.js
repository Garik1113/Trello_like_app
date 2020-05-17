import {
  CREATE_NEW_CARD,
  GET_ALL_BOARD_CARDS,
  TOGGLE_CURRENT_CARD_OPEN,
  GET_SEARCHING_MEMBERS,
  CLEAR_SEARCH_RESULTS,
  ADD_MEMBER_TO_CARD,
  ADD_CARD_IMAGE,
  ADD_CARD_DESCRIPTION,
} from "../constants";

const initialState = {
  currentCard: null,
  cards: [],
  searchingMembers: [],
};

export const card = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_NEW_CARD:
      return { ...state, cards: [...state.cards, action.payload] };
    case GET_ALL_BOARD_CARDS:
      return { ...state, cards: action.payload };
    case TOGGLE_CURRENT_CARD_OPEN:
      if (action.payload.isOpen) {
        const currentCard = state.cards.find(
          (e) => e._id === action.payload.card_id
        );

        return { ...state, currentCard };
      } else {
        return { ...state, currentCard: null };
      }
    case GET_SEARCHING_MEMBERS:
      return { ...state, searchingMembers: action.payload };
    case CLEAR_SEARCH_RESULTS:
      return { ...state, searchingMembers: [] };
    case ADD_MEMBER_TO_CARD:
      return {
        ...state,
        currentCard: {
          ...state.currentCard,
          members: [...state.currentCard.members, action.payload.member],
        },
      };
    case ADD_CARD_IMAGE:
      return {
        ...state,
        currentCard: { ...state.currentCard, imgSrc: action.payload },
      };
    case ADD_CARD_DESCRIPTION:
      return {
        ...state,
        currentCard: { ...state.currentCard, description: action.payload },
      };
    default:
      return state;
  }
};
