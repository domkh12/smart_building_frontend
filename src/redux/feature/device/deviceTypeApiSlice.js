import { apiSlice } from "../../app/api/apiSlice";
import {setDeviceTypeDataById, setDeviceTypeNames} from "./deviceSlice";

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
    }),

    updateDeviceType: builder.mutation({
      query: ({id, ...initialState}) => ({
        url: `/device-types/${id}`,
        method: "PUT",
        body: {
          ...initialState,
        },
      }),
      invalidatesTags: (result, error, arg) => [{type: "DeviceType", id: "LIST"}],
    }),

    getDeviceTypeById: builder.mutation({
      query: (id) => ({
        url: `/device-types/${id}`,
        method: "GET",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setDeviceTypeDataById({ data }));
        } catch (error) {
          console.log(error);
        }
      }
    }),

    deleteDeviceTypeById: builder.mutation({
      query: ({id}) => ({
        url: `/device-types/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [{type: "DeviceType", id: "LIST"}],
    })


  }),
});

export const {
  useDeleteDeviceTypeByIdMutation,
  useGetDeviceTypeByIdMutation,
  useUpdateDeviceTypeMutation,
  useGetDeviceTypeNamesMutation,
  useGetAllDeviceTypesQuery,
  useAddNewDeviceTypeMutation
} = deviceTypeApiSlice;
