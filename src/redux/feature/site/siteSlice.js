import { createSlice } from "@reduxjs/toolkit";

const siteSlice = createSlice({
  name: "sites",

  // initial data
  initialState: {
    changedSite: false,
    sites: [],
    sitesForChange: [{}],
    isQuickEditBranchOpen: false,
    branchForQuickEdit: {},
    branchTypeFilter: [],
    searchKeywords: "",
  },

  // function
  reducers: {
    setSites: (state, action) => {
      state.sites = action.payload;
    },
    setChangedSite: (state, action) => {
      state.changedSite = !state.changedSite;
    },
    setSitesForChange: (state, action) => {
      state.sitesForChange = action.payload;
    },
    setIsQuickEditBranchOpen: (state, action) => {
      state.isQuickEditBranchOpen = action.payload;
    },
    setBranchForQuickEdit: (state, action) => {
      state.branchForQuickEdit = action.payload;
    },
    setBranchTypeFilter: (state, action) => {
      state.branchTypeFilter = action.payload;
    },
    setSearchKeywords: (state, action) => {
      state.searchKeywords = action.payload;
    }
  },
});

export const {
  setSites,
  setChangedSite,
  setSitesForChange,
  setIsQuickEditBranchOpen,
  setBranchForQuickEdit,
  setBranchTypeFilter,
  setSearchKeywords
} = siteSlice.actions;

export default siteSlice.reducer;
