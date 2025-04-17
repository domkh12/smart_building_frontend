import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const storedLanguage = localStorage.getItem("language") || "kh";

const initialState = {
  language: storedLanguage,
  translations: {},
  loading: false,
  error: null,
  isSuccess: false,
};

export const fetchTranslations = createAsyncThunk(
  "translation/fetchTranslations",
  async (lang) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_FRONT_URL}/data/${lang}.json`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  }
);

const translationSlice = createSlice({
  name: "translation",
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
      localStorage.setItem("language", action.payload);
    },
    setLoaded: (state, action) => {
      state.loaded = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTranslations.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isSuccess = false;
      })
      .addCase(fetchTranslations.fulfilled, (state, action) => {
        state.loading = false;
        state.translations = action.payload;
        state.isSuccess = true;
      })
      .addCase(fetchTranslations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.isSuccess = false;
      })
  },
});

export const { setLanguage, setLoaded } = translationSlice.actions;
export default translationSlice.reducer;
