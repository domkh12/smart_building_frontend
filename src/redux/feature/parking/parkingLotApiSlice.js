import { apiSlice } from "../../app/api/apiSlice";

export const parkingLotApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addNewParkingLots: builder.mutation({
      query: (initialState) => ({
        url: "/parking-lots",
        method: "POST",
        body: {
          ...initialState,
        },
      }),
      invalidatesTags: [{ type: "Parking", id: "LIST" }],
    }),
  }),
});

export const {useAddNewParkingLotsMutation} = parkingLotApiSlice;
