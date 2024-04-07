import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  title: '',
  author: '',
  onlyFavority: false, // по умрлчанию должны отображаться все книги
};

// редюсер для фильтров
const filterSlice = createSlice({
  name: 'filter', // название редюсера
  initialState,
  reducers: {
    // функции-редюсеры для редюсера filter
    setTitleFilter: (state, action) => {
      // console.log(state);
      // в этой функции создадим новое состояние и изменим в объекте initialState - свойство title
      /*  
      return {
        ...state,
        title: action.payload,
      };
    */
      // поэтому эта функция и делает, то, что делает редюсер

      // мутирование state при использовании slices
      state.title = action.payload;
      // return state - это делать ненужно благодаря библиотеке Immer library

      /*
      state = {
        title: action.payload,
      };
      return state;
      */
    },
    setAuthorFilter: (state, action) => {
      state.author = action.payload; // возвращать здесь state не нужно, мы его таким образом возвращаем
    },

    /*
    setOnlyFavoriteFilter: (state, action) => {
      state.onlyFavority = action.payload;
    },
    */
    setOnlyFavoriteFilter: (state) => {
      state.onlyFavority = !state.onlyFavority; // можно и такой вариант, так как у нас только два допустимых значения
    },

    resetFilters: () => {
      // state.title=''
      // так будет проще
      return initialState;
    },
  },
});

// actions содержит функции action creators, которые создают объекты со свойствами type/payload
//console.log(filterSlice.actions); // {setTitleFilter}

//console.log(filterSlice.actions.setTitleFilter('payload')); // {type: 'filter/setTitleFilter', payload: 'payload'}

//const setTitleFilter = filterSlice.actions.setTitleFilter
// или через деструктуризацию объекта

export const {
  setTitleFilter,
  setAuthorFilter,
  setOnlyFavoriteFilter,
  resetFilters,
} = filterSlice.actions;

export const selectTitleFilter = (state) => state.filter.title; // filter это заголовок slice
export const selectAuthorFilter = (state) => state.filter.author; // filter это заголовок slice
export const selectOnlyFavoriteFilter = (state) => state.filter.onlyFavority;

// это свойство содержит сам редюсер
export default filterSlice.reducer;
