import { createSlice } from "@reduxjs/toolkit";

const actionSlice = createSlice({
  name: "action",
  initialState: {
    isCollapsed: true,
    isLoadingBar: false,
    isPaginationSuccess: false,
    isScrolling: false,
    isLoadingSnackBar: false,
    captionSnackBar: "",
    isOpenSnackBar: false,
    isErrorSnackbar: false,
    isOpenConfirmDelete: false,
    isFiltered: false,
    isOpenSettingDrawer: false,
    isOpenDrawerSensor: false,
    isOpenEsp32CodeModal: false,
  },
  reducers: {
    setIsOpenEsp32CodeModal(state, action) {
      state.isOpenEsp32CodeModal = action.payload;
    },
    setIsOpenDrawerSensor(state, action) {
      state.isOpenDrawerSensor = action.payload;
    },
    toggleCollapsed(state, action) {
      state.isCollapsed = !state.isCollapsed;
    },
    setIsLoadingBar(state, action) {
      state.isLoadingBar = action.payload;
    },
    setIsPaginationSuccess(state, action) {
      state.isPaginationSuccess = action.payload;
    },
    setIsScrolling(state, action) {
      state.isScrolling = action.payload;
    },
    setIsLoadingSnackBar(state, action) {
      state.isLoadingSnackBar = action.payload;
    },
    setCaptionSnackBar(state, action) {
      state.captionSnackBar = action.payload;
    },
    setIsOpenSnackBar(state, action) {
      state.isOpenSnackBar = action.payload;
    },
    setErrorSnackbar(state, action) {
      state.isErrorSnackbar = action.payload;
    },
    setIsOpenConfirmDelete(state, action) {
      state.isOpenConfirmDelete = action.payload;
    },
    setIsFiltered(state, action) {
      state.isFiltered = action.payload;
    },
    setIsOpenSettingDrawer(state, action) {
      state.isOpenSettingDrawer = action.payload;
    },
  },
});

export const {
  setIsOpenEsp32CodeModal,
  setIsOpenDrawerSensor,
  setIsOpenSettingDrawer,
  toggleCollapsed,
  setIsLoadingBar,
  setIsPaginationSuccess,
  setIsScrolling,
  setIsLoadingSnackBar,
  setCaptionSnackBar,
  setIsOpenSnackBar,
  setErrorSnackbar,
  setIsOpenConfirmDelete,
  setIsFiltered,
} = actionSlice.actions;

export default actionSlice.reducer;
