import { configureStore } from "@reduxjs/toolkit";
import appSettingsReducer from "./reducers/appSettings";

export default configureStore({
  reducer: {
    appSettings: appSettingsReducer
  }
});
