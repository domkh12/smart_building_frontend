import { createSlice } from "@reduxjs/toolkit";

const siteTypeSlice = createSlice({
  name: "siteType",
  initialState: {
    siteTypeData: [{}],
  },
  reducers: {
    setSiteTypeData(state, action) {
      state.siteTypeData = action.payload;
    },
  },
});

export const { setSiteTypeData } = siteTypeSlice.actions;

export default siteTypeSlice.reducer;
