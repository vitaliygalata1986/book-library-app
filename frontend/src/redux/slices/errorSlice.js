import { createSlice } from '@reduxjs/toolkit';
import { UseDispatch, useSelector } from 'react-redux';
const initialState = '';
const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError: (state, action) => {
      return action.payload;
    },
    clearError: () => {
      // return '';
      // или так
      return initialState;
    },
  },
});

export const { setError, clearError } = errorSlice.actions;
export const selectErrorMessage = (state) => state.error; // сообщение об ошибке это строка, будет находится в state.error
export default errorSlice.reducer;
