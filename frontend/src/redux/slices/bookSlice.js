import { createSlice } from '@reduxjs/toolkit';
const initialState = [];

const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook: (state, action) => {
      //return [...state, action.payload];
      state.push(action.payload); // можно мутировать state благодаря библиотеке Immer library
    },
    deleteBook: (state, action) => {
      return state.filter((book) => book.id !== action.payload);
    },
    toggleFavorite: (state, action) => {
      // мы можем менять один из объектов в этом массиве
      // новый возвращать ненужно благодаря библиотеке Immer library
      state.forEach((book) => {
        if (book.id === action.payload) {
          book.isFavorite = !book.isFavorite;
        }
      });

      // map возвращает новый массив
      //   return state.map(
      //     (book) =>
      //       book.id === action.payload
      //         ? { ...book, isFavorite: !book.isFavorite }
      //         : book
      //     /*
      //     (book) => {
      //       if (book.id === action.payload) {
      //         return { ...book, isFavorite: !book.isFavorite };
      //       }
      //       return book;
      //     }
      //     */
      //   );
    },
  },
});

export const { addBook, deleteBook, toggleFavorite } = bookSlice.actions;

export const selectAllBooks = (state) => state.books;

export default bookSlice.reducer;
