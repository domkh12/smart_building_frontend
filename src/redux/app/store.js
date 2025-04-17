import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../feature/auth/authSlice.js";
import actionReducer from "../feature/actions/actionSlice.js";
import { apiSlice } from "./api/apiSlice.js";
import userReducer from "../feature/users/userSlice.js";
import vehicleReducer from "../feature/vehicles/vehicleSlice.js";
import parkingDetailReducer from "../feature/parking/parkingDetailSlice.js";
import { setupListeners } from "@reduxjs/toolkit/query";
import translationReducer from "../feature/translate/translationSlice.js";
import parkingReducer from "../feature/parking/parkingSlice.js";
import siteReducer from "../feature/site/siteSlice.js";
import companiesReducer from "../feature/company/companySlice.js";
import cityReducer from "../feature/city/citySlice.js";
import siteTypeReducer from "../feature/siteType/siteTypeSlice.js";
import buildingReducer from "../feature/building/buildingSlice.js";
import floorReducer from "../feature/floor/floorSlice.js";
import deviceReducer from "../feature/device/deviceSlice.js";
import roomReducer from "../feature/room/roomSlice.js";
import messageReducer from "../feature/message/messageSlice.js";
import analysisReducer from "../feature/analysis/analysisSlice.js";
import appReducer from "../feature/app/appSlice.js";
import themeReducer from "../feature/theme/themeSlice.js";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    theme: themeReducer,
    auth: authReducer,
    users: userReducer,
    action: actionReducer,
    vehicles: vehicleReducer,
    parking: parkingReducer,
    parkingDetail: parkingDetailReducer,
    translation: translationReducer,
    sites: siteReducer,
    companies: companiesReducer,
    city: cityReducer,
    siteType: siteTypeReducer,
    building: buildingReducer,
    floor: floorReducer,
    device: deviceReducer,
    room: roomReducer,
    message: messageReducer,
    analysis: analysisReducer,
    app: appReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat(apiSlice.middleware),
  devTools: true,
});

setupListeners(store.dispatch);
export default store;
