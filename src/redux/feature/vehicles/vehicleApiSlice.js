import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";
import {
  setLicensePlateProvincesFetched,
  setLicensePlateTypesFetched,
  setVehicleTypeFetched,
} from "./vehicleSlice";

const vehicleAdapter = createEntityAdapter({});

const initialState = vehicleAdapter.getInitialState();

export const vehicleApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVehicles: builder.query({
      query: ({ pageNo = 1, pageSize = 20 }) => ({
        url: `/vehicles?pageNo=${pageNo}&pageSize=${pageSize}`,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        console.log("responseData: ", responseData);
        const loadVehicles = responseData.content.map((vehicle) => {
          vehicle.id = vehicle.uuid;
          return vehicle;
        });
        return {
          ...vehicleAdapter.setAll(initialState, loadVehicles),
          totalPages: responseData.page.totalPages,
          totalElements: responseData.page.totalElements,
          pageNo: responseData.page.number,
          pageSize: responseData.page.size,
        };
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Vehicle", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Vehicle", id })),
          ];
        } else return [{ type: "Vehicle", id: "LIST" }];
      },
    }),

    filterVehicles: builder.query({
      query: ({
        pageNo = 1,
        pageSize = 20,
        keywords = "",
        branchId = "",
        vehiceTypeId = "",
      }) => ({
        url: `/vehicles/filters?pageNo=${pageNo}&pageSize=${pageSize}&keywords=${keywords}&branchId=${branchId}&vehicleTypeId=${vehiceTypeId}`,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        console.log("responseData: ", responseData);
        const loadVehicles = responseData.content.map((vehicle) => {
          vehicle.id = vehicle.uuid;
          return vehicle;
        });
        return {
          ...vehicleAdapter.setAll(initialState, loadVehicles),
          totalPages: responseData.page.totalPages,
          totalElements: responseData.page.totalElements,
          pageNo: responseData.page.number,
          pageSize: responseData.page.size,
        };
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Vehicle", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Vehicle", id })),
          ];
        } else return [{ type: "Vehicle", id: "LIST" }];
      },
    }),

    addNewVehicle: builder.mutation({
      query: (initialState) => ({
        url: "/vehicles",
        method: "POST",
        body: {
          ...initialState,
        },
      }),
      invalidatesTags: [{ type: "Vehicle", id: "LIST" }],
    }),

    updateVehicle: builder.mutation({
      query: ({ uuid, ...initialState }) => ({
        url: `/vehicles/${uuid}`,
        method: "PATCH",
        body: {
          ...initialState,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Vehicle", id: arg.uuid },
      ],
    }),

    deleteVehicle: builder.mutation({
      query: ({ id }) => ({
        url: `/vehicles/${id}`,
        method: "DELETE",
        body: {
          id,
        },
      }),
      invalidatesTags: [{ type: "Vehicle", id: "LIST" }],
    }),

    getAllLicensePlateProvinces: builder.mutation({
      query: () => ({
        url: "/license-plate-provinces",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setLicensePlateProvincesFetched({ data }));
        } catch (error) {
          console.error("Failed to fetch:", error);
        }
      },
    }),

    getAllVehicleTypes: builder.mutation({
      query: () => ({
        url: "/vehicle-types",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setVehicleTypeFetched({ data }));
        } catch (error) {
          console.error("Failed to fetch:", error);
        }
      },
    }),

    getAllLicensePlateTypes: builder.mutation({
      query: () => ({
        url: "/license-plate-types",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setLicensePlateTypesFetched({ data }));
        } catch (error) {
          console.error("Failed to fetch:", error);
        }
      },
    }),
  }),
});

export const {
  useGetVehiclesQuery,
  useAddNewVehicleMutation,
  useUpdateVehicleMutation,
  useGetAllLicensePlateProvincesMutation,
  useGetAllVehicleTypesMutation,
  useGetAllLicensePlateTypesMutation,
  useDeleteVehicleMutation,
  useFilterVehiclesQuery,
} = vehicleApiSlice;

// return query result object

export const selectVehicleResult =
  vehicleApiSlice.endpoints.getVehicles.select();

// create momorized selector

const selectVehicleData = createSelector(
  selectVehicleResult,
  (vehicleResult) => vehicleResult.data // normalized state object with ids & entities
);

// getSelector creates these selectors and we rename them with aliase using destructuring

export const {
  selectAll: selectAllVehicles,
  selectById: selectVehicleById,
  selectIds: selectVehicleIds,
  // pass the selector that return the vehicle slice of state
} = vehicleAdapter.getSelectors(
  (state) => selectVehicleData(state) ?? initialState
);
