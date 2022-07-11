import { configureStore, combineReducers } from "@reduxjs/toolkit";
import  todosReducer  from "./feauters/todosSlice"
import  authReducer from "./feauters/authSlice"


export const store = configureStore({
  reducer: combineReducers({
    todos: todosReducer,
    auth: authReducer

  }),
});
