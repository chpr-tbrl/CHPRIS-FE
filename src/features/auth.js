// user management
import { API } from "services";
import { createSlice, createAction } from "@reduxjs/toolkit";

const initialState = {
  uid: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveAuth: (state, action) => {
      return {
        ...state,
        ...action.payload,
        uid: action.payload.id,
      };
    },
    clearAuth: (state) => {
      return {
        ...state,
        ...initialState,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      API.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        return {
          ...state,
          ...payload,
          uid: payload.id,
        };
      }
    );
  },
});

// Action creators are generated for each reducer function
export const { saveAuth, clearAuth } = authSlice.actions;

// auth selector
export const authSelector = (state) => state.auth;

export const logout = createAction("LOG_OUT");

export default authSlice.reducer;
