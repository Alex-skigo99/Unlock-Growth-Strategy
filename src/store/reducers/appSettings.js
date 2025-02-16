import { createSlice } from "@reduxjs/toolkit";

export const appSettings = createSlice({
  name: "appSettings",
  initialState: {
    isLoaderOn: false,
    isMobile: window.innerWidth < 650
  },
  reducers: {
    setLoaderOn: (state) => {
      state.isLoaderOn = true;
    },
    setIsMobile: (state, action) => {
      state.isMobile = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { setLoaderOn, setLoaderOff, setIsMobile } = appSettings.actions;

export default appSettings.reducer;
