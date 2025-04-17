import {createEntityAdapter, createSelector} from "@reduxjs/toolkit";
import {apiSlice} from "../../app/api/apiSlice";
import {setAllNameFloor} from "./floorSlice";

const floorAdapter = createEntityAdapter({});

const initialState = floorAdapter.getInitialState();

export const floorApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getFloor: builder.query({
            query: ({pageNo = 1, pageSize = 5}) => ({
                url: `/floors?pageNo=${pageNo}&pageSize=${pageSize}`, validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                },
            }), transformResponse: (responseData) => {
                const loadedFloor = responseData.content.map((floor) => {
                    floor.id = floor.id;
                    return floor;
                });
                return {
                    ...floorAdapter.setAll(initialState, loadedFloor),
                    totalPages: responseData.page.totalPages,
                    totalElements: responseData.page.totalElements,
                    pageNo: responseData.page.number,
                    pageSize: responseData.page.size,
                };
            }, providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [{type: "Floor", id: "LIST"}, ...result.ids.map((id) => ({type: "Floor", id})),];
                } else return [{type: "Floor", id: "LIST"}];
            },
        }),

        getFloorFilter: builder.query({
            query: ({keywords, buildingId, pageNo = 1, pageSize = 5}) => ({
                url: `/floors/filters?pageNo=${pageNo}&pageSize=${pageSize}&keywords=${keywords}&buildingId=${buildingId}`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                },
            }), transformResponse: (responseData) => {
                const loadedFloor = responseData.content.map((floor) => {
                    floor.id = floor.id;
                    return floor;
                });
                return {
                    ...floorAdapter.setAll(initialState, loadedFloor),
                    totalPagesFilter: responseData.page.totalPages,
                    totalElementsFilter: responseData.page.totalElements,
                    pageNoFilter: responseData.page.number,
                    pageSizeFilter: responseData.page.size,
                };
            }, providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [{type: "Floor", id: "LIST"}, ...result.ids.map((id) => ({type: "Floor", id})),];
                } else return [{type: "Floor", id: "LIST"}];
            },
        }),

        addNewFloor: builder.mutation({
            query: (initialState) => ({
                url: "/floors", method: "POST", body: {
                    ...initialState,
                },
            }),
            invalidatesTags: [{type: "Floor", id: "LIST"}, {type: "Building", id: "LIST"}, {
                type: "BuildingName",
                id: "LIST"
            }, {type: "FloorName", id: "LIST"}],
        }),

        updateFloor: builder.mutation({
            query: ({id, ...initialState}) => ({
                url: `/floors/${id}`, method: "PUT", body: {
                    ...initialState
                }
            }),
            invalidatesTags: (result, error, arg) => [{type: "Floor", arg: arg.id}, {type: "FloorName", id: "LIST"}],
        }),

        deleteFloor: builder.mutation({
            query: ({id}) => ({
                url: `/floors/${id}`, method: "DELETE",
            }),
            invalidatesTags: (result, error, arg) => [{type: "Building", id: arg.id}, {
                type: "Floor",
                id: "LIST"
            }, {type: "Device", id: "LIST"}, {type: "Room", id: "LIST"}, {type: "FloorName", id: "LIST"}],
        }),

        getAllFloorName: builder.query({
            query: () => `/floors/name`, providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [{type: "FloorName", id: "LIST"}, ...result.ids.map((id) => ({type: "FloorName", id})),];
                } else return [{type: "FloorName", id: "LIST"}];
            },
        }),

        getFloorById: builder.query({
            query: (id) => `floors/${id}`, providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [{type: "FloorUpdate", id: "LIST"}, ...result.ids.map((id) => ({type: "FloorUpdate", id})),];
                } else return [{type: "FloorUpdate", id: "LIST"}];
            },
        })

    }),
});

export const {
    useDeleteFloorMutation,
    useUpdateFloorMutation,
    useGetFloorQuery,
    useAddNewFloorMutation,
    useGetAllFloorNameQuery,
    useGetFloorFilterQuery,
    useGetFloorByIdQuery
} = floorApiSlice;

// return the query result object
export const selectFloorResult = floorApiSlice.endpoints.getFloor.select();

// create momorized selector
const selectFloorData = createSelector(selectFloorResult, (floorResult) => floorResult.data // normalized state object with ids & entities
);

// getSelector creates these selectors and we rename them with aliase using destructuring
export const {
    selectAll: selectAllFloor,
    selectById: selectFloorById,
    selectIds: selectFloorIds, // pass the selector that return the floor slice of state
} = floorAdapter.getSelectors((state) => selectFloorData(state) ?? initialState);
