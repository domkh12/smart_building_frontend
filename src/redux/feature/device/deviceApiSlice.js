import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const deviceAdapter = createEntityAdapter({});

const initialState = deviceAdapter.getInitialState();

export const deviceApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDevice: builder.query({
      query: ({ pageNo = 1, pageSize = 5 }) => ({
        url: `/devices?pageNo=${pageNo}&pageSize=${pageSize}`,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        const loadedDevice = responseData.content.map((device) => {
          device.id = device.id;
          return device;
        });
        return {
          ...deviceAdapter.setAll(initialState, loadedDevice),
          totalPages: responseData.page.totalPages,
          totalElements: responseData.page.totalElements,
          pageNo: responseData.page.number,
          pageSize: responseData.page.size,
        };
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Device", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Device", id })),
          ];
        } else return [{ type: "Device", id: "LIST" }];
      },
    }),

    getDeviceFilter: builder.query({
      query: ({ pageNo = 1, pageSize = 5, keywords, deviceTypeId, buildingId }) => ({
        url: `/devices/filters?pageNo=${pageNo}&pageSize=${pageSize}&keywords=${keywords}&deviceTypeId=${deviceTypeId}&buildingId=${buildingId}`,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        const loadedDevice = responseData.content.map((device) => {
          device.id = device.id;
          return device;
        });
        return {
          ...deviceAdapter.setAll(initialState, loadedDevice),
          totalPagesFilter: responseData.page.totalPages,
          totalElementsFilter: responseData.page.totalElements,
          pageNoFilter: responseData.page.number,
          pageSizeFilter: responseData.page.size,
        };
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Device", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Device", id })),
          ];
        } else return [{ type: "Device", id: "LIST" }];
      },
    }),

    addNewDevice: builder.mutation({
      query: (initialState) => ({
        url: "/devices",
        method: "POST",
        body: {
          ...initialState,
        },
      }),
      invalidatesTags: [
        { type: "Device", id: "LIST" },
        { type: "Room", id: "LIST" },

      ],
    }),

    updateDeviceValue: builder.mutation({
      query: ({ id, value }) => ({
        url: `/devices/${id}/value?value=${value}`,
        method: "PUT",
      }),
    }),

    updateSingleDevice: builder.mutation({
      query: ({ id, ...initialState}) => ({
        url: `/devices/${id}`,
        method: "PUT",
        body: {
          ...initialState
        }
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Device", id: arg.id}
      ]
    }),

    deleteDevice: builder.mutation({
      query: ({ id }) => ({
        url: `/devices/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Device", id: "LIST" },
      ],
    }),

    getDeviceById: builder.query({
      query: (id) => `devices/${id}`,
      providesTags: (result, error, id) => [{ type: 'DeviceUpdate', id }],
    })
  }),
});

export const {
  useGetDeviceFilterQuery,
  useUpdateSingleDeviceMutation,
  useGetDeviceQuery,
  useAddNewDeviceMutation,
  useUpdateDeviceValueMutation,
  useGetDeviceByIdQuery,
  useDeleteDeviceMutation
} = deviceApiSlice;

// return the query result object
export const selectDeviceResult = deviceApiSlice.endpoints.getDevice.select();

// create momorized selector
const selectDeviceData = createSelector(
  selectDeviceResult,
  (deviceResult) => deviceResult.data // normalized state object with ids & entities
);

// getSelector creates these selectors and we rename them with aliase using destructuring
export const {
  selectAll: selectAllDevice,
  selectById: selectDeviceById,
  selectIds: selectDeviceIds,
  // pass the selector that return the device slice of state
} = deviceAdapter.getSelectors(
  (state) => selectDeviceData(state) ?? initialState
);
