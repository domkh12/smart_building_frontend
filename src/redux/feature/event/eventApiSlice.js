import { apiSlice } from "../../app/api/apiSlice";

export const companiesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getEventsByDevice: builder.mutation({
            query: () => ({
                url: "/events/rooms/{id}",
                method: "GET",
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    console.log("data", data)
                } catch (error) {
                    console.log(error);
                }
            },
        }),
    }),
});

export const { useGetAllCompaniesMutation } = companiesApiSlice;
