import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: {
    uuid: "",
    status: "",
    pageNo: 1,
    pageSize: 5,
    totalPages: 0,
    user: {},
    isOnlineUser: {},
    isLoadingUser: false,
    genders: [{}],
    roles: [{}],
    signUpMethods: [{}],
    roleFilter: [],
    signUpMethodFilter: [],
    searchQuery: "",
    statusFilter: "",
    branchFilter: [],
    resultFound: "",
    isOpenQuickEdit: false,
    userForQuickEdit: {},
    quickEditUserReponse: {},
    idUserToDelete: "",
    allFullNameUsersFetched: [],
    isOpenModalMultiFactor: false
  },
  reducers: {
    setIsOpenModalMultiFactor(state, action){
      state.isOpenModalMultiFactor = action.payload;
    },
    setIsLoadingUser(state, action) {
      state.isLoadingUser = action.payload;
    },
    setUuid: (state, action) => {
      state.uuid = action.payload;
    },
    setIsOnlineUser: (state, action) => {
      state.isOnlineUser = action.payload;
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
    setPageNo: (state, action) => {
      state.pageNo = action.payload;
    },
    setPageSize(state, action) {
      state.pageSize = action.payload;
    },
    setTotalPages(state, action) {
      state.totalPages = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    setGender(state, action) {
      state.genders = action.payload;
    },
    setRoles(state, action) {
      state.roles = action.payload;
    },
    setSignUpMethods(state, action) {
      state.signUpMethods = action.payload;
    },
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    clearFilter(state) {
      state.searchQuery = "";
      state.roleFilter = [];
      state.signUpMethodFilter = [];
      state.branchFilter = [];
      state.statusFilter = "";
    },
    setRoleFilter(state, action) {
      state.roleFilter = action.payload;
    },
    setStatusFilter(state, action) {
      state.statusFilter = action.payload;
    },
    setSignUpMethodFilter(state, action) {
      state.signUpMethodFilter = action.payload;
    },
    setClearStatusFilter(state, action) {
      state.statusFilter = "";
    },
    setClearSearchQuery(state, action) {
      state.searchQuery = "";
    },
    setBranchFilter(state, action) {
      state.branchFilter = action.payload;
    },
    setResultFound(state, action) {
      state.resultFound = action.payload;
    },
    setIsOpenQuickEdit(state, action) {
      state.isOpenQuickEdit = action.payload;
    },
    setUserForQuickEdit(state, action) {
      state.userForQuickEdit = action.payload;
    },
    setQuickEditUserReponse(state, action) {
      state.quickEditUserReponse = action.payload;
    },
    setAllFullNameUsersFetched(state, action) {
      state.allFullNameUsersFetched = action.payload;
    },
    setIdUserToDelete(state, action) {
      state.idUserToDelete = action.payload;
    }
  },
});

export const {
  setIsOpenModalMultiFactor,
  clearFilter,
  setIsLoadingUser,
  setUuid,
  setStatus,
  setIsOnlineUser,
  increasePageNo,
  decreasePageNo,
  resetPageNo,
  setPageSize,
  setTotalPages,
  lastPageNo,
  setUser,
  setGender,
  setRoles,
  setSignUpMethods,
  setSearchQuery,
  setRoleFilter,
  setStatusFilter,
  setSignUpMethodFilter,
  setClearStatusFilter,
  setClearSearchQuery,
  setPageNo,
  setBranchFilter,
  setResultFound,
  setIsOpenQuickEdit,
  setUserForQuickEdit,
  setQuickEditUserReponse,
  setAllFullNameUsersFetched,
  setIdUserToDelete,
} = userSlice.actions;

export default userSlice.reducer;
