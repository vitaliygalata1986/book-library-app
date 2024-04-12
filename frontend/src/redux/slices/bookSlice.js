import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { createBookWidthId } from '../../utils/createBookWithId';
const initialState = [];

export const fetchBooks = createAsyncThunk('books/fetchBook', async () => {
  // первый аргумент - это название действия - books - должен совпадать с названием в createSlice
  // второй - это функция, которая выполняется в бэкенде
  const responce = await axios.get('http://localhost:4000/random-book');
  // console.log(responce.data);
  return responce.data;
});

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
  extraReducers: (builder) => {
    // в случае, если промис был успешно удовлетворен и мы получили результат от сервера
    // то будет вызвана функция, которую мы укажем вторым аргументом
    // и это функция - редюсер
    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      // и внутри этой функции мы можем выполнять действия по формированию нового состояния
      // так как здесь работает Immer, то мы можем менять состояние
      if (action.payload.title && action.payload.author) {
        state.push(createBookWidthId(action.payload, 'API'));
      }
    });
  },
});

export const { addBook, deleteBook, toggleFavorite } = bookSlice.actions;

export const selectAllBooks = (state) => state.books;

export default bookSlice.reducer;

/*
export const thunkFunction = async (dispatch, getState) => {
  // console.log(getState());
  // async action
  try {
    const responce = await axios.get('http://localhost:4000/random-book');
    if (responce?.data?.title && responce?.data?.author) {
      dispatch(addBook(createBookWidthId(responce.data, 'API')));
    }
  } catch (err) {
    console.log('Error fetching random book', err);
  }
  // console.log(getState());
};
*/
