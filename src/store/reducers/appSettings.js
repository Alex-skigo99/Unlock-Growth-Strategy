import { createSlice } from "@reduxjs/toolkit";

// Global UI state — controls the full-screen loading spinner via axios interceptors
export const appSettings = createSlice({
  name: "appSettings",
  initialState: {
    isLoaderOn: false
  },
  reducers: {
    setLoaderOn: (state) => {
      state.isLoaderOn = true;
    },
    setLoaderOff: (state) => {
      state.isLoaderOn = false;
    }
  }
});

export const { setLoaderOn, setLoaderOff } = appSettings.actions;

export default appSettings.reducer;
