import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './books/reducer';

const store = configureStore({
  // так как здесь мы будем подключать 3 редюсера, то
  // будем передавать их в виде объекта
  reducer: {
    books: booksReducer,
    // filter: filterReducer
  },
  //reducer: booksReducer,
});

export default store;
