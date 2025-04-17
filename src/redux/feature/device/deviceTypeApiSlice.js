import { apiSlice } from "../../app/api/apiSlice";
import {setDeviceTypeNames} from "./deviceSlice";

export const deviceTypeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllDeviceTypes: builder.query({
      query: () => `/device-types`,
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [{type: "DeviceType", id: "LIST"}, ...result.ids.map((id) => ({type: "DeviceType", id})),];
        } else return [{type: "DeviceType", id: "LIST"}];
      },
    }),

    addNewDeviceType: builder.mutation({
      query: (initialState) => ({
        url: "/device-types",
        method: "POST",
        body: {
          ...initialState,
        },
      }),
      invalidatesTags: [
        { type: "DeviceType", id: "LIST" }

      ],
    }),

    getDeviceTypeNames: builder.mutation({
      query: () => ({
        url: "/device-types/names",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setDeviceTypeNames({ data }));
        } catch (error) {
          console.log(error);
        }
      },
    })


  }),
});

export const { useGetDeviceTypeNamesMutation, useGetAllDeviceTypesQuery, useAddNewDeviceTypeMutation } = deviceTypeApiSlice;
