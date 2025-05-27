import { createSlice } from '@reduxjs/toolkit';

// Read saved mode from localStorage or fallback to 'light'
const savedMode = localStorage.getItem('themeMode') || 'light';

const initialState = {
    mode: savedMode,
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleMode: (state) => {
            state.mode = state.mode === 'light' ? 'dark' : 'light';
            localStorage.setItem('themeMode', state.mode); // Save to localStorage
        },
        setMode: (state, action) => {
            state.mode = action.payload;
            localStorage.setItem('themeMode', action.payload); // Save to localStorage
        },
    },
});

export const { toggleMode, setMode } = themeSlice.actions;
export default themeSlice.reducer;
