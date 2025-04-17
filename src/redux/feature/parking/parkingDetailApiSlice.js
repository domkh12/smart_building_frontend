import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const parkingDetailAdapter = createEntityAdapter({});

const initialState = parkingDetailAdapter.getInitialState();

export const parkingDetailApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getParkingDetail: builder.query({
      query: () => `/parking-slots`,
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: (responseData) => {
        console.log("responseData", responseData);
        const loadedParkingDetail = responseData.map((parkingDetail) => {
          parkingDetail.id = parkingDetail.uuid;
          return parkingDetail;
        });
        return parkingDetailAdapter.setAll(initialState, loadedParkingDetail);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "ParkingDetail", id: "LIST" },
            ...result.ids.map((id) => ({ type: "ParkingDetail", id })),
          ];
        } else return [{ type: "ParkingDetail", id: "LIST" }];
      },
    }),
    addNewParkingDetail: builder.mutation({
      query: (initialState) => ({
        url: "/parkingDetail",
        method: "POST",
        body: {
          ...initialState,
        },
      }),
      invalidatesTags: [{ type: "ParkingDetail", id: "LIST" }],
    }),

    updateParkingDetail: builder.mutation({
      query: ({ id, ...initialParkingDetailData }) => ({
        url: `/parkingDetail/${id}`,
        method: "PATCH",
        body: {
          ...initialParkingDetailData,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "ParkingDetail", id: arg.id },
      ],
    }),

    deleteParkingDetail: builder.mutation({
      query: ({ id }) => ({
        url: `/parkingDetail/${id}`,
        method: "DELETE",
        body: {
          id,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "ParkingDetail", id: arg.id },
      ],
    }),

    getParkingDetailByUuid: builder.mutation({
      query: ({ uuid }) => ({
        url: `/parking-details/${uuid}`,
      }),
      transformResponse: (responseData) => {
        console.log("responseData", responseData);
        const loadedParkingDetail = responseData.map((parkingDetail) => ({
          ...parkingDetail,
          id: parkingDetail.uuid,
        }));
        return parkingDetailAdapter.setAll(initialState, [loadedParkingDetail]);
      },
    }),
   
    connectedParkingDetail: builder.mutation({
      query: ({ uuid, status }) => ({
        url: `/parkingDetail/${uuid}/status`,
        method: "PATCH",
        body: {
          status,
        },
      }),
      transformResponse: (responseData) => {
        console.log("responseData", responseData);
      },
      invalidatesTags: (result, error, arg) => [
        { type: "ParkingDetail", id: arg.uuid },
      ],
    }),
    getFullNameParkingDetail: builder.query({
      query: () => `/parkingDetail/full-names`,
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: (responseData) => {
        const loadedParkingDetail = responseData.map((parkingDetail) => {
          parkingDetail.id = parkingDetail.uuid;
          return parkingDetail;
        });
        return parkingDetailAdapter.setAll(initialState, loadedParkingDetail);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "ParkingDetail", id: "LIST" },
            ...result.ids.map((id) => ({ type: "ParkingDetail", id })),
          ];
        } else return [{ type: "ParkingDetail", id: "LIST" }];
      },
    }),
  }),
});

export const {
  useGetParkingDetailQuery,
  useGetParkingDetailByUuidMutation,
  useAddNewParkingDetailMutation,
  useUpdateParkingDetailMutation,
  useDeleteParkingDetailMutation,
  usePaginationParkingDetailMutation,
  useSearchParkingDetailMutation,
  useFindByUuidMutation,
  useConnectedParkingDetailMutation,
  useGetFullNameParkingDetailQuery,
} = parkingDetailApiSlice;

// return the query result object
export const selectParkingDetailResult =
  parkingDetailApiSlice.endpoints.getParkingDetail.select();
// create momorized selector
const selectParkingDetailData = createSelector(
  selectParkingDetailResult,
  (parkingDetailResult) => parkingDetailResult.data // normalized state object with ids & entities
);

// getSelector creates these selectors and we rename them with aliase using destructuring
export const {
  selectAll: selectAllParkingDetail,
  selectById: selectParkingDetailById,
  selectIds: selectParkingDetailIds,
  // pass the selector that return the parkingDetail slice of state
} = parkingDetailAdapter.getSelectors(
  (state) => selectParkingDetailData(state) ?? initialState
);
