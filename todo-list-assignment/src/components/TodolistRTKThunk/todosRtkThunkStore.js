import { configureStore } from '@reduxjs/toolkit';
import { todosSlice } from './todosRtkThunkSlice'; 

export const store = configureStore({
  reducer: {
    todos: todosSlice.reducer,
  },
});
