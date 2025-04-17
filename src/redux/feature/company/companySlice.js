import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
  name: "companies",
  initialState: {
    companyNames: [{}],
    companiesData: [{}],
    companyFilter: [],
  },
  reducers: {
    setCompanyNames(state, action) {
      state.companyNames = action.payload;
    },
    setCompaniesData(state, action) {
      state.companiesData = action.payload;
    },
    setCompanyFilter(state, action) {
      state.companyFilter = action.payload;
    },
  },
});

export const { setCompanyNames, setCompaniesData, setCompanyFilter } =
  companySlice.actions;

export default companySlice.reducer;
