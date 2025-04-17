import {createSlice} from "@reduxjs/toolkit";

const floorSlice = createSlice({
    name: "floor",

    // initial data
    initialState: {
        searchKeywordsFloor: "",
        allNameFloor: [{}],
        pageNo: 1,
        pageSize: 5,
        isQuickEditFloorOpen: false,
        floorDataForQuickEdit: {},
        idFloorToDelete: ""
    },

    // function
    reducers: {
        setIdFloorToDelete(state, action){
          state.idFloorToDelete = action.payload;
        },
        setFloorDataForQuickEdit: (state, action) => {
            state.floorDataForQuickEdit = action.payload;
        }, setIsQuickEditFloorOpen(state, action) {
            state.isQuickEditFloorOpen = action.payload;
        }, setPageNoFloor: (state, action) => {
            state.pageNo = action.payload;
        }, setPageSizeFloor: (state, action) => {
            state.pageSize = action.payload;
        }, setSearchKeywordsFloor: (state, action) => {
            state.searchKeywordsFloor = action.payload;
        }, setAllNameFloor: (state, action) => {
            state.allNameFloor = action.payload;
        },
    },
});

export const {
    setIdFloorToDelete,
    setFloorDataForQuickEdit,
    setIsQuickEditFloorOpen,
    setSearchKeywordsFloor,
    setAllNameFloor,
    setPageNoFloor,
    setPageSizeFloor
} = floorSlice.actions;

export default floorSlice.reducer;
