import { createSlice } from "@reduxjs/toolkit";

const parkingDetailSlice = createSlice({
  name: "parkingDetail",
  initialState: {
    slotDetails : {}
  },
  reducers: {
    setParkingSlot(state, action) {      
      state.slotDetails = action.payload
    },
  },
});

export const { setParkingSlot } = parkingDetailSlice.actions;

export default parkingDetailSlice.reducer;
