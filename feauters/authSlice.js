import * as SecureStore from "expo-secure-store";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {API} from "../feauters/API";

export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    const response = await axios.post(`${API}/auth/login`, user);
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      const response = await axios.post(`${API}/auth/register`, user);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const initialState = {
  user: {},
  loading: false,
  regError: null,
  loginError: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = {};
      SecureStore.deleteItemAsync("access_token");
      state.isLoggedIn = false;
    },
    clearError: (state) => {
      state.regError = null;
      state.loginError = null;
    },
  },

  extraReducers: {
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      state.loginError = null;
      state.user = action.payload;
      if (action.payload.token) {
        SecureStore.setItemAsync(
          "access_token",
          JSON.stringify(action.payload.token)
        );
        state.isLoggedIn = true;
      }
    },

    [login.pending]: (state) => {
      state.loading = true;
    },

    [login.rejected]: (state, action) => {
      state.loading = false;
      state.loginError = action.payload.message;
    },

    [register.fulfilled]: (state, action) => {
      state.loading = false;
      state.regError = null;
      localStorage.setItem(
        "access_token",
        JSON.stringify(action.payload.token)
      );
      state.user = action.payload;
    },

    [register.pending]: (state) => {
      state.loading = true;
    },

    [register.rejected]: (state, action) => {
      state.loading = false;
      state.regError = action.payload.message;
    },
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
