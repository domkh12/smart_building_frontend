import { apiSlice } from "../../app/api/apiSlice";
import { setUser, setUuid } from "../users/userSlice";
import { logOut, setCredentials, setQrCodeUrl } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),

    sendLogout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(logOut());
          setTimeout(() => {
            dispatch(apiSlice.util.resetApiState());
          }, 1000);
        } catch (err) {
          console.log(err);
        }
      },
    }),

    refresh: builder.mutation({
      query: () => ({
        url: "/auth/refresh",
        method: "GET",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { accessToken } = data;
          const { uuid } = data;
          dispatch(setCredentials({ accessToken }));
          dispatch(setUuid(uuid));
        } catch (error) {
          console.log(error);
        }
      },
    }),

    getQrCode2Fa: builder.mutation({
      query: () => ({
        url: "/auth/enable-2fa",
        method: "POST",
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setQrCodeUrl({ data }));
        } catch (error) {
          console.log(error);
        }
      },
    }),

    verifyTwoFa: builder.mutation({
      query: (code) => ({
        url: `/auth/verify-2fa?code=${code}`,
        method: "POST",
      }),
    }),

    disableTwoFa: builder.mutation({
      query: () => ({
        url: `/auth/disable-2fa`,
        method: "POST",
      }),
    }),

    verify2FALogin: builder.mutation({
      query: ({ code, token }) => ({
        url: `/auth/verify-2fa-login?code=${code}&token=${token}`,
        method: "POST",
      }),
    }),

    verifySites: builder.mutation({
      query: ({ uuid, token }) => ({
        url: `/auth/verify-sites?uuid=${uuid}&token=${token}`,
        method: "POST",
      }),
      
    }),

    getUserProfile: builder.mutation({
      query: () => ({
        url: `/auth/profiles`,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (error) {
          console.error("Failed to fetch user:", error);
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useSendLogoutMutation,
  useRefreshMutation,
  useGetQrCode2FaMutation,
  useVerifyTwoFaMutation,
  useDisableTwoFaMutation,
  useVerify2FALoginMutation,
  useVerifySitesMutation,
  useGetUserProfileMutation,
} = authApiSlice;
