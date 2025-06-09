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
    idRoomToDelete: "",
    selectFirstRoomById: localStorage.getItem("selectFirstRoomById") ? localStorage.getItem("selectFirstRoomById") : "",
    roomDataForEsp32Code: {},
    esp32RoomId: "",
    esp32TempId: "",
    esp32IsTemp: false,
    esp32IsHumidity: false,
    esp32HumidityId: "",
    esp32IsPower: false,
    esp32PowerId: "",
    esp32IsPm2_5: false,
    esp32Pm2_5Id: "",
    esp32IsSwitch: false,
    esp32SwitchId: [],
  },
  reducers: {
    setRoomDataForEsp32Code(state, action) {
      state.roomDataForEsp32Code = action.payload;
      state.esp32IsTemp = false;
      state.esp32IsHumidity = false;
      state.esp32IsPower = false;
      state.esp32IsPm2_5 = false;
      state.esp32IsSwitch = false;
      state.esp32SwitchId = [];
      state.esp32RoomId = action.payload.id;
      if (action.payload) {
        action.payload.devices.forEach((device) => {
          if (device.deviceType.name.toLowerCase() === "temperature") {
            state.esp32IsTemp = true;
            state.esp32TempId = device.id;
          }else if (device.deviceType.name.toLowerCase() === "humidity") {
            state.esp32IsHumidity = true;
            state.esp32HumidityId = device.id;
          }else if (device.deviceType.name.toLowerCase() === "power") {
            state.esp32IsPower = true;
            state.esp32PowerId = device.id;
          }else if (device.deviceType.name.toLowerCase() === "pm2_5") {
            state.esp32IsPm2_5 = true;
            state.esp32Pm2_5Id = device.id;
          }else if (device.deviceType.controllable) {
            state.esp32IsSwitch = true;
            state.esp32SwitchId.push(device.id);
          }
        })
      }
    },
    setSelectFirstRoomById(state, action) {
      state.selectFirstRoomById = action.payload;
      localStorage.setItem("selectFirstRoomById", action.payload);
    },
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
  setRoomDataForEsp32Code,
  setSelectFirstRoomById,
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
