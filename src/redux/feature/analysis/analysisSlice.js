import {createSlice} from "@reduxjs/toolkit";
import dayjs from "dayjs";

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
        totalPower: "",
        dateFrom: dayjs().subtract(30, "days").format("YYYY-MM-DD"),
        dateTo: dayjs().format("YYYY-MM-DD"),
        selectedPeriod: "30days",
        analysisData: {},
    },

    // function
    reducers: {
        setSelectedPeriod(state, action){
          if (action.payload === "7days") {
            state.dateFrom = dayjs().subtract(7, "days").format("YYYY-MM-DD");
            state.dateTo = dayjs().format("YYYY-MM-DD");
          } else if (action.payload === "30days") {
            state.dateFrom = dayjs().subtract(30, "days").format("YYYY-MM-DD");
            state.dateTo = dayjs().format("YYYY-MM-DD");
          } else if (action.payload === "month") {
            state.dateFrom = dayjs().subtract(1, "month").startOf("month").format("YYYY-MM-DD");
            state.dateTo = dayjs().startOf("month").format("YYYY-MM-DD");
          }
            state.selectedPeriod = action.payload;
        },
        setAnalysisData(state, action) {
            state.analysisData = action.payload;
        },
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
    setSelectedPeriod,
    setAnalysisData,
    setPowerChart,
    setTotalFloorCount,
    setTotalCountUser,
    setTotalCountBuilding,
    setTotalCountDevice,
    setTotalCountRoom
} =
    analysisSlice.actions;

export default analysisSlice.reducer;
