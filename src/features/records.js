// record management
import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const recordSlice = createSlice({
  name: "records",
  initialState,
  reducers: {
    saveRecord: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    clearRecord: (state) => {
      return {
        ...state,
        ...initialState,
      };
    },
  },
});

// Action creators are generated for each reducer function
export const { saveRecord, clearRecord } = recordSlice.actions;

export const recordSelector = (state) => state.records;

export default recordSlice.reducer;
