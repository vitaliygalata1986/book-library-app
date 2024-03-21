import * as actionTypes from './actionTypes';

export const addBook = (newBook) => {
  return {
    // отправляем действие в redux store
    type: actionTypes.ADD_BOOK,
    payload: newBook,
  };
};

export const deleteBook = (id) => {
  return {
    type: actionTypes.DELETE_BOOK,
    payload: id,
  };
};

export const toggleFaforite = (id) => {
  return {
    type: actionTypes.TOGGLE_FAVORITE,
    payload: id,
  };
};
