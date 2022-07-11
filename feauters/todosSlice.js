import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { API } from "../feauters/API";

export const getTodos = createAsyncThunk("todos/getTodos", async () => {
  const tokenValue = await SecureStore.getItemAsync("access_token");
  const token = JSON.parse(tokenValue);
  const response = await axios.get(`${API}/todos`, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
});

export const addTodo = createAsyncThunk("todos/addTodo", async (todo) => {
  const tokenValue = await SecureStore.getItemAsync("access_token");
  const token = JSON.parse(tokenValue);
  const response = await axios.post(`${API}/todos`, todo, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
});

export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id) => {
  const tokenValue = await SecureStore.getItemAsync("access_token");
  const token = JSON.parse(tokenValue);
  const response = await axios.delete(`${API}/todos/${id}`, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
});

export const updateTodo = createAsyncThunk("todos/updateTodo", async (todo) => {
  const tokenValue = await SecureStore.getItemAsync("access_token");
  const token = JSON.parse(tokenValue);
  const response = await axios.patch(`${API}/todos/${todo._id}`, todo, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
});

const initialState = {
  todos: [],
  loading: false,
  onAddLoading: false,
  error: null,
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    clearTodos: (state) => {
      state.todos = [];
    },
  },
  extraReducers: {
    [getTodos.pending]: (state, action) => {
      state.loading = true;
    },
    [getTodos.fulfilled]: (state, action) => {
      state.loading = false;
      state.todos = action.payload;
    },
    [getTodos.rejected]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
    [addTodo.pending]: (state, action) => {
      state.onAddLoading = true;
    },
    [addTodo.fulfilled]: (state, action) => {
      state.onAddLoading = false;
      const newTodo = action.payload.newTodo;
      state.todos.unshift(newTodo);
    },
    [addTodo.rejected]: (state, action) => {
      state.onAddLoading = false;
      state.loading = false;
    },

    [deleteTodo.fulfilled]: (state, action) => {
      state.loading = false;
      const newTodos = state.todos.filter(
        (todo) => todo._id !== action.payload._id
      );
      state.todos = newTodos;
    },
    [updateTodo.fulfilled]: (state, action) => {
      state.loading = false;
      const newTodo = action.payload;
      const newTodos = state.todos.map((todo) => {
        if (todo._id === newTodo._id) {
          return newTodo;
        }
        return todo;
      });
      state.todos = newTodos;
    },
    [updateTodo.rejected]: (state, action) => {
      state.error = action.error;
      state.loading = false;
    },
  },
});

export const { clearTodos } = todosSlice.actions;
export default todosSlice.reducer;
