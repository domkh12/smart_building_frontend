import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
    name: "app",
    initialState: {
        isInitialLoading: true,
    },
    reducers: {
        setInitialLoading: (state, action) => {
            state.isInitialLoading = action.payload;
        },
    },
});

export const { setInitialLoading } = appSlice.actions;

export const selectIsInitialLoading = (state) => state.app.isInitialLoading;

export default appSlice.reducer;
