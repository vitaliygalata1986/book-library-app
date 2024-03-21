import * as actionTypes from './actionTypes';
const initialState = [];

const bookReducer = (state = initialState, action) => {
  // будем возращать новое состояние в зависимости от типа действия
  switch (action.type) {
    case actionTypes.ADD_BOOK: {
      return [...state, action.payload];
    }
    case actionTypes.DELETE_BOOK: {
      return state.filter((book) => book.id !== action.payload); // filter не модифицирует массив, а возвращает новый
    }
    case actionTypes.TOGGLE_FAVORITE: {
      // map возвоащает новый массив
      return state.map(
        (book) =>
          book.id === action.payload
            ? { ...book, isFavorite: !book.isFavorite }
            : book
        /*
        (book) => {
          if (book.id === action.payload) {
            return { ...book, isFavorite: !book.isFavorite };
          }
          return book;
        }
        */
      );
    }
    default:
      return state;
  }
};

export default bookReducer;
