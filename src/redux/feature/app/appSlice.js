import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
    name: "app",
    initialState: {
        isInitialLoading: true,
        isOpenUtilSearch: false,
    },
    reducers: {
        setOpenUtilSearch: (state, action) => {
            state.isOpenUtilSearch = action.payload;
        },
        setInitialLoading: (state, action) => {
            state.isInitialLoading = action.payload;
        },
    },
});

export const {
    setOpenUtilSearch,
    setInitialLoading } = appSlice.actions;

export const selectIsInitialLoading = (state) => state.app.isInitialLoading;

export default appSlice.reducer;
