import { createSlice } from "@reduxjs/toolkit";

const roomSlice = createSlice({
  name: "room",
  initialState: {
    roomDataById: {},
    roomNamesDataFetched:[],
    selectFistValueOfSelectBox : "",
    searchFilter: "",
    buildingFilterForRoom: [],
    pageNo: 1,
    pageSize: 5,
    roomId: [],
    isQuickEditRoomOpen: false,
    roomDataForQuickEdit: {},
    idRoomToDelete: ""

  },
  reducers: {
    setIdRoomToDelete(state, action){
      state.idRoomToDelete = action.payload;
    },
    setRoomDataForQuickEdit(state, action){
      state.roomDataForQuickEdit = action.payload;
    },
    setIsQuickEditRoomOpen(state, action){
      state.isQuickEditRoomOpen = action.payload;
    },
    setRoomId(state, action) {
      state.roomId = action.payload;
    },
    setPageNoRoom (state, action) {
      state.pageNo = action.payload;
    },
    setPageSizeRoom(state, action) {
      state.pageSize = action.payload;
    },
    setBuildingFilterForRoom (state, action) {
      state.buildingFilterForRoom = action.payload;
    },
    setSearchKeywordRoom(state, action) {
      state.searchFilter = action.payload;
    },
    setRoomDataById(state, action) {
      state.roomDataById = action.payload;
    },
    setRoomNamesDataFetched(state, action) {
      state.roomNamesDataFetched = action.payload;
    },
    setSelectFirstValueOfSelectBox(state, action) {
      state.selectFirstValueOfSelectBox = action.payload;
    },
    clearSelectFirstValueOfSelectBox(state, action) {
      state.selectFirstValueOfSelectBox = "";
    }
  },
});

export const {
  setIdRoomToDelete,
  setRoomDataForQuickEdit,
  setIsQuickEditRoomOpen,
  setRoomId,
  setPageNoRoom,
  setPageSizeRoom,
  setBuildingFilterForRoom,
  setSearchKeywordRoom,
  setRoomDataById,
  setRoomNamesDataFetched,
  clearSelectFirstValueOfSelectBox } = roomSlice.actions;

export default roomSlice.reducer;
