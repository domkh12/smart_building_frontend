import {apiSlice} from "../../app/api/apiSlice";
import {
    setTotalCountBuilding,
    setTotalCountDevice,
    setTotalCountRoom,
    setTotalCountUser,
    setTotalFloorCount
} from "./analysisSlice.js";
import {createEntityAdapter} from "@reduxjs/toolkit";

const analysisAdapter = createEntityAdapter({});

const initialState = analysisAdapter.getInitialState();

export const analysisApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPower: builder.query({
            query: ({range = ""}) => ({
                url: `/analysis/power-usage?range=${range}`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                },
            }),
            transformResponse: (responseData) => {
                // Directly return the structured response
                return {
                    totalPower: responseData.totalPower,
                    series: responseData.series
                };
            },
            providesTags: (result, error, arg) => {
                return [{type: "Analysis", id: "LIST"}];
            },
        }),


        getTotalCounts: builder.mutation({
            query: () => ({
                url: "/analysis/total-counts",
            }),
            async onQueryStarted(arg, {dispatch, queryFulfilled}) {
                try {
                    const {data} = await queryFulfilled;
                    dispatch(setTotalCountUser(data.totalUserCount));
                    dispatch(setTotalCountBuilding(data.totalBuildingCount));
                    dispatch(setTotalCountDevice(data.totalDeviceCount));
                    dispatch(setTotalCountRoom(data.totalRoomCount));
                    dispatch(setTotalFloorCount(data.totalFloorCount));
                } catch (error) {
                    console.log(error);
                }
            },
        }),


    }),
});

export const {useGetPowerQuery, useGetTotalCountsMutation} = analysisApiSlice;
