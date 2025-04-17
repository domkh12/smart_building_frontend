import { apiSlice } from "../../app/api/apiSlice";
import { setCompaniesData } from "./companySlice";

export const companiesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCompanies: builder.mutation({
      query: () => ({
        url: "/companies",
        method: "GET",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCompaniesData({ data }));
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useGetAllCompaniesMutation } = companiesApiSlice;
