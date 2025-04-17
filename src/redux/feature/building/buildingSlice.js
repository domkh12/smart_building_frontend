import {createSlice} from "@reduxjs/toolkit";

const buildingSlice = createSlice({
    name: "building",

    // initial data
    initialState: {
        buildingSearchKeyword: "",
        buildingFilter: [],
        buildingNamesFetched: [{}],
        idBuildingToDelete: "",
        pageSize: 5,
        pageNo: 1,
        isQuickEditBuildingOpen: false,
        buildingDataForQuickEdit: {},
    },

    // function
    reducers: {
        setBuildingSearchKeyword(state, action){
          state.buildingSearchKeyword = action.payload;
        },
        setBuildingFilter(state, action) {
            state.buildingFilter = action.payload;
        },
        setBuildingDataForQuickEdit(state, action) {
            state.buildingDataForQuickEdit = action.payload;
        },
        setIsQuickEditBuildingOpen(state, action) {
            state.isQuickEditBuildingOpen = action.payload;
        },
        setBuildingNamesFetched(state, action) {
            state.buildingNamesFetched = action.payload;
        },
        setIdBuildingToDelete(state, action) {
            state.idBuildingToDelete = action.payload;
        },
        setPageSizeBuilding(state, action) {
            state.pageSize = action.payload;
        },
        setPageNoBuilding(state, action) {
            state.pageNo = action.payload;
        },
        setClearBuildingSearchKeyword(state, action){
            state.clearBuildingSearchKeyword = "";
        }
    },
});

export const {
    setClearBuildingSearchKeyword,
    setBuildingSearchKeyword,
    setBuildingFilter,
    setPageSizeBuilding,
    setPageNoBuilding,
    setBuildingNamesFetched,
    setIdBuildingToDelete,
    setIsQuickEditBuildingOpen,
    setBuildingDataForQuickEdit
} =
    buildingSlice.actions;

export default buildingSlice.reducer;
