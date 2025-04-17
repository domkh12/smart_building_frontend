import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",

  // initial data
  initialState: {
    token: null,
    qrCodeUrl: null,
    twoFASecretCode: null,
    isTwoFAEnabled: false,
    userProfile: {}
  },

  // function
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken } = action.payload;
      state.token = accessToken;
    },
    setQrCodeUrl: (state, action) => {
      const { data } = action.payload;
      const { qrCodeUrl } = data;
      state.qrCodeUrl = qrCodeUrl;
    },
    setTwoFASecretCode: (state, action) => {
      const { data } = action.payload;
      const { twoFASecretCode } = data;
      state.twoFASecretCode = twoFASecretCode;
    },
    setIsTwoFAEnabled: (state, action) => {
      const { data } = action.payload;
      const { is2faEnabled } = data;
      state.isTwoFAEnabled = is2faEnabled;
    },
    logOut: (state, action) => {
      state.token = null;
    },
    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
    }
  },
});

export const {
  setCredentials,
  logOut,
  setQrCodeUrl,
  setTwoFASecretCode,
  setIsTwoFAEnabled,
  setUserProfile,
} = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state) => state.auth.token;
export const selectQrCodeUrl = (state) => state.auth.qrCodeUrl;
export const selectTwoFASecretCode = (state) => state.auth.twoFASecretCode;
export const selectIsTwoFAEnabled = (state) => state.auth.isTwoFAEnabled;
