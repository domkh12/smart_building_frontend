import { apiSlice } from "../../app/api/apiSlice";
import { setSiteTypeData } from "./siteTypeSlice";

export const siteTypeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllSiteTypes: builder.mutation({
      query: () => ({
        url: "/site-types",
        method: "GET",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setSiteTypeData({ data }));
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useGetAllSiteTypesMutation } = siteTypeApiSlice;
