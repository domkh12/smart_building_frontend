import {createEntityAdapter, createSelector} from "@reduxjs/toolkit";
import {apiSlice} from "../../app/api/apiSlice";
import {setBuildingNamesFetched} from "./buildingSlice";

const buildingAdapter = createEntityAdapter({});

const initialState = buildingAdapter.getInitialState();

export const buildingApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getBuilding: builder.query({
            query: ({pageNo = 1, pageSize = 5}) => ({
                url: `/buildings?pageNo=${pageNo}&pageSize=${pageSize}`, validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                },
            }), transformResponse: (responseData) => {
                const loadedBuilding = responseData.content.map((building) => {
                    building.id = building.id;
                    return building;
                });
                return {
                    ...buildingAdapter.setAll(initialState, loadedBuilding),
                    totalPages: responseData.page.totalPages,
                    totalElements: responseData.page.totalElements,
                    pageNo: responseData.page.number,
                    pageSize: responseData.page.size,
                };
            }, providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [{type: "Building", id: "LIST"}, ...result.ids.map((id) => ({type: "Building", id})),];
                } else return [{type: "Building", id: "LIST"}];
            },
        }),

        filterBuilding: builder.query({
            query: ({keywords, pageNo, pageSize}) => ({
                url: `/buildings/filters?pageNo=${pageNo}&pageSize=${pageSize}&keywords=${keywords}`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                },
            }), transformResponse: (responseData) => {
                const loadedBuilding = responseData.content.map((building) => {
                    building.id = building.id;
                    return building;
                });
                return {
                    ...buildingAdapter.setAll(initialState, loadedBuilding),
                    totalPagesFilter: responseData.page.totalPages,
                    totalElementsFilter: responseData.page.totalElements,
                    pageNoFilter: responseData.page.number,
                    pageSizeFilter: responseData.page.size,
                };
            }, providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [{type: "Building", id: "LIST"}, ...result.ids.map((id) => ({type: "Building", id})),];
                } else return [{type: "Building", id: "LIST"}];
            },
        }),

        addNewBuilding: builder.mutation({
            query: (initialState) => ({
                url: "/buildings", method: "POST", body: {
                    ...initialState,
                },
            }), invalidatesTags: [{type: "Building", id: "LIST"}, {type: "BuildingName", id: "LIST"}],
        }),

        getAllNameBuilding: builder.query({
            query: () => `/buildings/name`, providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [{type: "BuildingName", id: "LIST"}, ...result.ids.map((id) => ({type: "BuildingName", id})),];
                } else return [{type: "BuildingName", id: "LIST"}];
            },
        }),

        updateBuilding: builder.mutation({
            query: ({id, ...initialState}) => ({
                url: `/buildings/${id}`, method: "PUT", body: {
                    ...initialState,
                },
            }), invalidatesTags: (result, error, arg) => [
                {type: "Building", id: arg.id},
                {type: "BuildingName", id: "LIST"},
            ],
        }),

        deleteBuilding: builder.mutation({
            query: ({id}) => ({
                url: `/buildings/${id}`, method: "DELETE",
            }), invalidatesTags: (result, error, arg) => [{type: "Building", id: arg.id}, {
                type: "Floor", id: "LIST"
            }, {type: "Device", id: "LIST"}, {type: "Room", id: "LIST"},],
        }),

        getBuildingById: builder.query({
            query: (id) => `/buildings/${id}`, // Assuming your API endpoint for fetching a single building by ID is like this
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [{type: "BuildingUpdate", id: "LIST"}, ...result.ids.map((id) => ({type: "BuildingUpdate", id})),];
                } else return [{type: "BuildingUpdate", id: "LIST"}];
            },
        }),

    }),
});

export const {
    useFilterBuildingQuery,
    useDeleteBuildingMutation,
    useUpdateBuildingMutation,
    useGetBuildingQuery,
    useAddNewBuildingMutation,
    useGetAllNameBuildingMutation,
    useGetBuildingByIdQuery,
    useGetAllNameBuildingQuery
} = buildingApiSlice;

// return the query result object
export const selectBuildingResult = buildingApiSlice.endpoints.getBuilding.select();

// create momorized selector
const selectBuildingData = createSelector(selectBuildingResult, (buildingResult) => buildingResult.data // normalized state object with ids & entities
);

// getSelector creates these selectors and we rename them with aliase using destructuring
export const {
    selectAll: selectAllBuilding, selectById: selectBuildingById, selectIds: selectBuildingIds, // pass the selector that return the building slice of state
} = buildingAdapter.getSelectors((state) => selectBuildingData(state) ?? initialState);
