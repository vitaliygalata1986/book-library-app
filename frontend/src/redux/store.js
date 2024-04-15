import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './slices/bookSlice';
import filterReducer from './slices/filterSlice';
import errorReducer from './slices/errorSlice';

const store = configureStore({
  // так как здесь мы будем подключать 2 редюсера, то
  // будем передавать их в виде объекта
  reducer: {
    books: booksReducer,
    filter: filterReducer,
    error: errorReducer,
  },
  //reducer: booksReducer,
});

store.subscribe(() => {
  //console.log(store.getState());
});

export default store;
