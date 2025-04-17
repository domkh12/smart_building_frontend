import { createSlice } from "@reduxjs/toolkit";

const parkingSlice = createSlice({
  name: "parking",
  initialState: {
    parking: {},
    labels: {},
    idParkingToDelete: "",
  },
  reducers: {
    setParking: (state, action) => {
      state.parking = action.payload;
    },
    setLabels: (state, action) => {
      state.labels = action.payload;
    },
    setIdParkingToDelete: (state, action) => {
      state.idParkingToDelete = action.payload;
    },
    clearParking: (state, action) => {
      state.parking = {};
    },
  },
});

export const { setParking, setLabels, setIdParkingToDelete, clearParking } =
  parkingSlice.actions;

export default parkingSlice.reducer;
