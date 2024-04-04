import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  title: '',
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
      // return state - это делать ненужно

      /*
      state = {
        title: action.payload,
      };
      return state;
      */
    },
    resetFilters: (state) => {
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

export const { setTitleFilter, resetFilters } = filterSlice.actions;

export const selectTitleFilter = (state) => state.filter.title; // filter это заголовок slice

// это свойство содержит сам редюсер
export default filterSlice.reducer;