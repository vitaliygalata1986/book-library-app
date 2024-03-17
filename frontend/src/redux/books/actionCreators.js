import * as actionTypes from './actionTypes';

export const addBook = (newBook) => {
  return { // отправляем действие в redux store
    type: actionTypes.ADD_BOOK,
    payload: newBook,
  };
};
