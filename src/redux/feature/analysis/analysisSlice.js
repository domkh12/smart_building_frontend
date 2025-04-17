import {createSlice} from "@reduxjs/toolkit";

const analysisSlice = createSlice({
    name: "analysis",

    // initial data
    initialState: {
        totalCountUser: "",
        totalCountBuilding: "",
        totalCountRoom: "",
        totalCountDevice: "",
        totalFloorCount: "",
        xAxisPower: [],
        seriesPower: [],
        totalPower: ""
    },

    // function
    reducers: {
        setTotalFloorCount(state,action){
          state.totalFloorCount = action.payload;
        },
        setTotalCountUser(state, action) {
            state.totalCountUser = action.payload;
        },
        setTotalCountBuilding(state, action) {
            state.totalCountBuilding = action.payload;
        },
        setTotalCountDevice(state, action) {
            state.totalCountDevice = action.payload;
        },
        setTotalCountRoom(state, action) {
            state.totalCountRoom = action.payload;
        },
        setPowerChart(state, action) {
            state.totalPower = action.payload.totalPower;
            state.seriesPower = action.payload.series;
        }
    },
});

export const {
    setPowerChart,
    setTotalFloorCount,
    setTotalCountUser,
    setTotalCountBuilding,
    setTotalCountDevice,
    setTotalCountRoom
} =
    analysisSlice.actions;

export default analysisSlice.reducer;
