import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";
import { setLabels, setParking } from "./parkingSlice";

const parkingAdapter = createEntityAdapter({});

const initialState = parkingAdapter.getInitialState();

export const parkingApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getParkingSpaces: builder.query({
      query: ({ pageNo = 1, pageSize = 10 }) => ({
        url: `/parking-spaces?pageNo=${pageNo}&pageSize=${pageSize}`,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        const loadedParking = responseData.content.map((parking) => {
          parking.id = parking.uuid;
          return parking;
        });
        return parkingAdapter.setAll(initialState, loadedParking);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Parking", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Parking", id })),
          ];
        } else return [{ type: "Parking", id: "LIST" }];
      },
    }),
    addNewParking: builder.mutation({
      query: (initialState) => ({
        url: "/parking-spaces",
        method: "POST",
        body: {
          ...initialState,
        },
      }),
      invalidatesTags: [{ type: "Parking", id: "LIST" }],
    }),
    updateParking: builder.mutation({
      query: ({ id, ...initialParkingData }) => ({
        url: `/parking/${id}`,
        method: "PATCH",
        body: {
          ...initialParkingData,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Parking", id: arg.id },
      ],
    }),
    deleteParking: builder.mutation({
      query: ({ uuid }) => ({
        url: `/parking-spaces/${uuid}`,
        method: "DELETE",
        body: {
          uuid,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Parking", id: arg.uuid },
      ],
    }),
    searchParking: builder.mutation({
      query: ({ query }) => ({
        url: `/parking/search?q=${query}`,
      }),

      transformResponse: (responseData) => {
        const loadedParking = responseData.content.map((parking) => ({
          ...parking,
          id: parking.uuid,
        }));
        return {
          parking: loadedParking,
          totalPages: responseData.page.totalPages,
        };
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log("data", data);
          const { parking: newParking, totalPages: newTotalPages } = data;

          dispatch(
            parkingApiSlice.util.updateQueryData(
              "getParking",
              undefined,
              (draft) => {
                parkingAdapter.setAll(draft, newParking);
                draft.totalPages = newTotalPages;
              }
            )
          );
        } catch (error) {
          console.error("Failed to fetch paginated parking:", error);
        }
      },
    }),
    findAllLabels: builder.mutation({
      query: () => ({
        url: `/parking-spaces/labels`,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setLabels({ data }));
        } catch (error) {
          console.error("Failed to fetch parking label:", error);
        }
      },
    }),

    findParkingByUuid: builder.mutation({
      query: (uuid) => ({
        url: `/parking-spaces/${uuid}`,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setParking(data));
        } catch (error) {
          console.error("Failed to fetch user:", error);
        }
      },
      invalidatesTags: (result, error, arg) => [
        { type: "Parking", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetParkingSpacesQuery,
  useAddNewParkingMutation,
  useUpdateParkingMutation,
  useDeleteParkingMutation,
  useSearchParkingMutation,
  useFindAllLabelsMutation,
  useFindParkingByUuidMutation,
} = parkingApiSlice;

// return the query result object
export const selectParkingResult = parkingApiSlice.endpoints.getParkingSpaces.select();
// create momorized selector
const selectParkingData = createSelector(
  selectParkingResult,
  (parkingResult) => parkingResult.data // normalized state object with ids & entities
);

// getSelector creates these selectors and we rename them with aliase using destructuring
export const {
  selectAll: selectAllParking,
  selectById: selectParkingById,
  selectIds: selectParkingIds,
  // pass the selector that return the parking slice of state
} = parkingAdapter.getSelectors(
  (state) => selectParkingData(state) ?? initialState
);
