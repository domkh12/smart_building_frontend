import { createSlice } from "@reduxjs/toolkit";

const citySlice = createSlice({
  name: "city",
  initialState: {
    cityData: [{}],
    cityFilter: []
  },
  reducers: {
    setCityData(state, action) {
      state.cityData = action.payload;
    },
    setCityFilter(state, action) {
      state.cityFilter = action.payload;
    }
  },
});

export const { setCityData, setCityFilter } = citySlice.actions;

export default citySlice.reducer;
