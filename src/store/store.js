import { configureStore } from "@reduxjs/toolkit";
import appSettingsReducer from "./reducers/appSettings";

// Single Redux store — currently holds only the global loading spinner flag
export default configureStore({
  reducer: {
    appSettings: appSettingsReducer
  }
});
