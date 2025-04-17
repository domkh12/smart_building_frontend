import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

const vehicleSlice = createSlice({
  name: "vehicles",
  initialState: {
    uuid: "",
    status: "",
    pageNo: 1,
    pageSize: 30,
    totalPages: 0,
    licensePlateProvincesFetched: [],
    vehicleTypeFetched: [],
    licensePlateTypesFetched: [],
    idVehicleToDelete: "",
    isOpenQuickEditVehicle: false,
    vehicleForQuickEdit: {},
    branchFilter: "",
    vehicleTypeFilter: "",
    searchKeywords: "",
    clearVehicleFilter: false,
  },
  reducers: {
    setUuid: (state, action) => {
      state.uuid = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    increasePageNo(state, action) {
      state.pageNo += 1;
    },
    decreasePageNo(state, action) {
      state.pageNo -= 1;
    },
    resetPageNo(state, action) {
      state.pageNo = 1;
    },
    lastPageNo(state, action) {
      console.log(state.totalPages);
      state.pageNo = state.totalPages;
    },
    setPageSize(state, action) {
      state.pageSize = action.payload;
    },
    setTotalPages(state, action) {
      state.totalPages = action.payload;
    },
    setLicensePlateProvincesFetched(state, action) {
      state.licensePlateProvincesFetched = action.payload;
    },
    setVehicleTypeFetched(state, action) {
      state.vehicleTypeFetched = action.payload;
    },
    setLicensePlateTypesFetched(state, action) {
      state.licensePlateTypesFetched = action.payload;
    },
    setIdVehicleToDelete(state, action) {
      state.idVehicleToDelete = action.payload;
    },
    setIsOpenQuickEditVehicle(state, action) {
      state.isOpenQuickEditVehicle = action.payload;
    },
    setVehicleForQuickEdit(state, action) {
      state.vehicleForQuickEdit = action.payload;
    },
    setBranchFilter(state, action) {
      state.branchFilter = action.payload;
    },
    setVehicleTypeFilter(state, action) {
      state.vehicleTypeFilter = action.payload;
    },
    setSearchKeywords(state, action) {
      state.searchKeywords = action.payload;
    },
    setClearVehicleFilter(state, action) {
      state.searchKeywords = "";
      state.vehicleTypeFilter = [];
      state.branchFilter = [];
    },
  },
});

export const {
  setUuid,
  setStatus,
  increasePageNo,
  decreasePageNo,
  resetPageNo,
  setPageSize,
  setTotalPages,
  lastPageNo,
  setLicensePlateProvincesFetched,
  setVehicleTypeFetched,
  setLicensePlateTypesFetched,
  setIdVehicleToDelete,
  setIsOpenQuickEditVehicle,
  setVehicleForQuickEdit,
  setBranchFilter,
  setVehicleTypeFilter,
  setSearchKeywords,
  setClearVehicleFilter,
} = vehicleSlice.actions;

export default vehicleSlice.reducer;
