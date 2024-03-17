import * as actionTypes from './actionTypes';
const initialState = [];

const bookReducer = (state = initialState, action) => {
  // будем возращать новое состояние в зависимости от типа действия
  switch (action.type) {
    case actionTypes.ADD_BOOK: {
      return [...state, action.payload];
    }
    default:
      return state;
  }
};

export default bookReducer;
