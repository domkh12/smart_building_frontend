import { apiSlice } from "../../app/api/apiSlice";
import { setCityData } from "./citySlice";

export const cityApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCities: builder.mutation({
      query: () => ({
        url: "/cities",
        method: "GET",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCityData({ data }));
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useGetAllCitiesMutation } = cityApiSlice;
