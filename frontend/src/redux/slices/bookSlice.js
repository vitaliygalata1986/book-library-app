import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { createBookWidthId } from '../../utils/createBookWithId';
import { setError } from './errorSlice';
const initialState = {
  books: [],
  isLoadingViaAPI: false,
};

export const fetchBooks = createAsyncThunk(
  'books/fetchBook',
  async (url, thunkAPI) => {
    try {
      // console.log(thunkAPI);
      // первый аргумент - это название действия ('books/fetchBook',) - books - должен совпадать с названием в createSlice
      // второй - это функция, которая выполняется в бэкенде
      const responce = await axios.get(url);
      // console.log(responce.data);
      return responce.data;
    } catch (error) {
      // console.log(error.message); // Network Error
      // отправим оишбку в Redux store
      thunkAPI.dispatch(setError(error.message));
      // throw error; // нам нужно сгенерировать эту же ошибку, чтобы мы не попали в нижний редюсер для состояния fetchBooks.fulfilled -  builder.addCase(fetchBooks.fulfilled, (state, action) => {
      // тогда промис будет отклонен - и возникнет действие - rejected

      // другой вариант
      return thunkAPI.rejectWithValue(error); // тоесть мы отклоняем этот промис со значением
    }
  }
);

const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook: (state, action) => {
      //return [...state, action.payload];
      //state.books.push();
      state.books.push(action.payload);
      //state.push(action.payload); // можно мутировать state благодаря библиотеке Immer library
    },
    deleteBook: (state, action) => {
      //state.books = state.books.filter((book) => book.id !== action.payload);
      // state.books = state.books.filter((book) => book.id !== action.payload);
      return {
        ...state,
        books: state.books.filter((book) => book.id !== action.payload),
      };
    },
    toggleFavorite: (state, action) => {
      // мы можем менять один из объектов в этом массиве
      // новый возвращать ненужно благодаря библиотеке Immer library
      state.books.forEach((book) => {
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
      // console.log('CALLED');
      // console.log(action); // payload - > undefined
      // {type: 'books/fetchBook/fulfilled' - в случае ошибки, эта функция редюсер вызывается fetchBooks.fulfilled - поэтому нам нужно выкинуть ошибку throw error
      // и внутри этой функции мы можем выполнять действия по формированию нового состояния

      state.isLoadingViaAPI = false; // на false поменяем не зависимо от того, есть ли у нас action.payload.title && action.payload.author

      // так как здесь работает Immer, то мы можем менять состояние
      if (action.payload?.title && action.payload?.author) {
        state.books.push(createBookWidthId(action.payload, 'API'));
      }
    });
    builder.addCase(fetchBooks.pending, (state) => {
      // нет необходимости возвращать новый объект, благодаря наличию библиотеки Immer
      state.isLoadingViaAPI = true;
    });
    builder.addCase(fetchBooks.rejected, (state) => {
      state.isLoadingViaAPI = false;
    });
    /*
    builder.addCase(fetchBooks.rejected, (state, action) => {
     // console.log(action);
     setError()
    });
    */
  },
});

export const { addBook, deleteBook, toggleFavorite } = bookSlice.actions;

export const selectAllBooks = (state) => state.books.books;

export const selectIsLoadingViaAPI = (state) => state.books.isLoadingViaAPI;

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
